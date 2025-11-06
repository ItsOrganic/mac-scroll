import { WorkflowExecution, WorkflowDefinition, WorkflowStep, WorkflowStepExecution } from '../../integrations/shared/types';
import { QueueService } from './queue-service';
import { logger } from '../utils/logger';

export class ExecutionService {
    constructor(private queueService: QueueService) { }

    async executeWorkflow(execution: WorkflowExecution, workflow: WorkflowDefinition): Promise<void> {
        try {
            execution.status = 'running';

            // Find the first step (trigger)
            const firstStep = workflow.steps.find(step => step.type === 'trigger');
            if (!firstStep) {
                throw new Error('No trigger step found in workflow');
            }

            // Execute the workflow steps sequentially
            await this.executeStep(execution, workflow, firstStep, execution.data);

            execution.status = 'completed';
            execution.completedAt = new Date();

            logger.info(`Workflow execution completed: ${execution.id}`);
        } catch (error) {
            execution.status = 'failed';
            execution.error = error instanceof Error ? error.message : 'Unknown error';
            execution.completedAt = new Date();

            logger.error(`Workflow execution failed: ${execution.id}`, error);
        }
    }

    private async executeStep(
        execution: WorkflowExecution,
        workflow: WorkflowDefinition,
        step: WorkflowStep,
        inputData: any
    ): Promise<any> {
        const stepExecution: WorkflowStepExecution = {
            id: this.generateId(),
            stepId: step.id,
            status: 'running',
            startedAt: new Date(),
            input: inputData,
            retryCount: 0
        };

        execution.steps.push(stepExecution);

        try {
            logger.info(`Executing step: ${step.name} (${step.id})`);

            let output: any;

            switch (step.type) {
                case 'trigger':
                    output = await this.executeTrigger(step, inputData);
                    break;
                case 'action':
                    output = await this.executeAction(step, inputData);
                    break;
                case 'condition':
                    output = await this.executeCondition(step, inputData);
                    break;
                case 'transform':
                    output = await this.executeTransform(step, inputData);
                    break;
                default:
                    throw new Error(`Unknown step type: ${step.type}`);
            }

            stepExecution.status = 'completed';
            stepExecution.completedAt = new Date();
            stepExecution.output = output;

            // Execute next steps if any
            if (step.nextSteps && step.nextSteps.length > 0) {
                for (const nextStepId of step.nextSteps) {
                    const nextStep = workflow.steps.find(s => s.id === nextStepId);
                    if (nextStep) {
                        await this.executeStep(execution, workflow, nextStep, output);
                    }
                }
            }

            return output;
        } catch (error) {
            stepExecution.status = 'failed';
            stepExecution.error = error instanceof Error ? error.message : 'Unknown error';
            stepExecution.completedAt = new Date();

            logger.error(`Step execution failed: ${step.name} (${step.id})`, error);
            throw error;
        }
    }

    private async executeTrigger(step: WorkflowStep, inputData: any): Promise<any> {
        // In a real implementation, this would call the appropriate integration service
        logger.info(`Executing trigger: ${step.name}`);

        // Simulate trigger execution
        return {
            ...inputData,
            triggerExecuted: true,
            timestamp: new Date().toISOString()
        };
    }

    private async executeAction(step: WorkflowStep, inputData: any): Promise<any> {
        // In a real implementation, this would call the appropriate integration service
        logger.info(`Executing action: ${step.name}`);

        // Simulate action execution
        return {
            ...inputData,
            actionExecuted: true,
            actionName: step.name,
            timestamp: new Date().toISOString()
        };
    }

    private async executeCondition(step: WorkflowStep, inputData: any): Promise<any> {
        logger.info(`Executing condition: ${step.name}`);

        if (!step.condition) {
            throw new Error('Condition step missing condition configuration');
        }

        const { field, operator, value } = step.condition;
        const fieldValue = this.getNestedValue(inputData, field);

        let result = false;

        switch (operator) {
            case 'equals':
                result = fieldValue === value;
                break;
            case 'contains':
                result = String(fieldValue).includes(String(value));
                break;
            case 'greater_than':
                result = Number(fieldValue) > Number(value);
                break;
            case 'less_than':
                result = Number(fieldValue) < Number(value);
                break;
            default:
                throw new Error(`Unknown condition operator: ${operator}`);
        }

        return {
            ...inputData,
            conditionResult: result,
            condition: step.condition,
            timestamp: new Date().toISOString()
        };
    }

    private async executeTransform(step: WorkflowStep, inputData: any): Promise<any> {
        logger.info(`Executing transform: ${step.name}`);

        const { transformation, maxLength } = step.config;

        switch (transformation) {
            case 'summarize':
                return this.summarizeData(inputData, maxLength);
            case 'extract_keywords':
                return this.extractKeywords(inputData);
            case 'classify':
                return this.classifyData(inputData);
            default:
                throw new Error(`Unknown transformation: ${transformation}`);
        }
    }

    private summarizeData(data: any, maxLength: number = 200): any {
        const text = JSON.stringify(data);
        const summary = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;

        return {
            ...data,
            summary,
            originalLength: text.length,
            timestamp: new Date().toISOString()
        };
    }

    private extractKeywords(data: any): any {
        // Simple keyword extraction simulation
        const text = JSON.stringify(data).toLowerCase();
        const keywords = text.match(/\b\w{4,}\b/g) || [];
        const uniqueKeywords = [...new Set(keywords)].slice(0, 10);

        return {
            ...data,
            keywords: uniqueKeywords,
            timestamp: new Date().toISOString()
        };
    }

    private classifyData(data: any): any {
        // Simple classification simulation
        const text = JSON.stringify(data).toLowerCase();
        let category = 'general';

        if (text.includes('urgent') || text.includes('important')) {
            category = 'urgent';
        } else if (text.includes('error') || text.includes('failed')) {
            category = 'error';
        } else if (text.includes('success') || text.includes('completed')) {
            category = 'success';
        }

        return {
            ...data,
            category,
            confidence: 0.85,
            timestamp: new Date().toISOString()
        };
    }

    private getNestedValue(obj: any, path: string): any {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    private generateId(): string {
        return `step_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

