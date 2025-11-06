import { WorkflowDefinition, WorkflowExecution, WorkflowStep, WorkflowStepExecution } from '../../integrations/shared/types';
import { ExecutionService } from './execution-service';
import { logger } from '../utils/logger';

export class WorkflowEngine {
    private workflows: Map<string, WorkflowDefinition> = new Map();
    private executions: Map<string, WorkflowExecution> = new Map();

    constructor(private executionService: ExecutionService) { }

    async createWorkflow(workflowData: Partial<WorkflowDefinition>): Promise<WorkflowDefinition> {
        const workflow: WorkflowDefinition = {
            id: this.generateId(),
            name: workflowData.name || 'Untitled Workflow',
            description: workflowData.description || '',
            userId: workflowData.userId || '',
            teamId: workflowData.teamId,
            steps: workflowData.steps || [],
            triggers: workflowData.triggers || [],
            isActive: workflowData.isActive || false,
            createdAt: new Date(),
            updatedAt: new Date(),
            executionCount: 0,
            lastExecutedAt: undefined
        };

        this.workflows.set(workflow.id, workflow);
        logger.info(`Created workflow: ${workflow.id}`);

        return workflow;
    }

    async getWorkflow(workflowId: string): Promise<WorkflowDefinition | null> {
        return this.workflows.get(workflowId) || null;
    }

    async getUserWorkflows(userId: string): Promise<WorkflowDefinition[]> {
        return Array.from(this.workflows.values()).filter(w => w.userId === userId);
    }

    async updateWorkflow(workflowId: string, updates: Partial<WorkflowDefinition>): Promise<WorkflowDefinition | null> {
        const workflow = this.workflows.get(workflowId);
        if (!workflow) {
            return null;
        }

        const updatedWorkflow = {
            ...workflow,
            ...updates,
            updatedAt: new Date()
        };

        this.workflows.set(workflowId, updatedWorkflow);
        logger.info(`Updated workflow: ${workflowId}`);

        return updatedWorkflow;
    }

    async deleteWorkflow(workflowId: string): Promise<boolean> {
        const deleted = this.workflows.delete(workflowId);
        if (deleted) {
            logger.info(`Deleted workflow: ${workflowId}`);
        }
        return deleted;
    }

    async executeWorkflow(workflowId: string, triggerData?: any): Promise<WorkflowExecution> {
        const workflow = this.workflows.get(workflowId);
        if (!workflow) {
            throw new Error(`Workflow not found: ${workflowId}`);
        }

        if (!workflow.isActive) {
            throw new Error(`Workflow is not active: ${workflowId}`);
        }

        const execution: WorkflowExecution = {
            id: this.generateId(),
            workflowId,
            status: 'pending',
            startedAt: new Date(),
            steps: [],
            data: triggerData || {}
        };

        this.executions.set(execution.id, execution);

        // Update workflow execution count
        workflow.executionCount++;
        workflow.lastExecutedAt = new Date();
        this.workflows.set(workflowId, workflow);

        // Start execution
        this.executionService.executeWorkflow(execution, workflow);

        logger.info(`Started workflow execution: ${execution.id} for workflow: ${workflowId}`);

        return execution;
    }

    async getExecution(executionId: string): Promise<WorkflowExecution | null> {
        return this.executions.get(executionId) || null;
    }

    async getWorkflowExecutions(workflowId: string): Promise<WorkflowExecution[]> {
        return Array.from(this.executions.values()).filter(e => e.workflowId === workflowId);
    }

    async getUserExecutions(userId: string): Promise<WorkflowExecution[]> {
        const userWorkflows = await this.getUserWorkflows(userId);
        const workflowIds = userWorkflows.map(w => w.id);

        return Array.from(this.executions.values()).filter(e =>
            workflowIds.includes(e.workflowId)
        );
    }

    private generateId(): string {
        return `wf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Sample workflow for demonstration
    async createSampleWorkflow(userId: string): Promise<WorkflowDefinition> {
        const sampleWorkflow = await this.createWorkflow({
            name: 'Slack to Gmail Notification',
            description: 'Send a Gmail notification when a new message is posted in Slack',
            userId,
            steps: [
                {
                    id: 'trigger_slack_message',
                    type: 'trigger',
                    name: 'New Slack Message',
                    config: {
                        service: 'slack',
                        trigger: 'new_message',
                        channel: '#general'
                    }
                },
                {
                    id: 'transform_message',
                    type: 'transform',
                    name: 'Transform Message',
                    config: {
                        transformation: 'summarize',
                        maxLength: 200
                    }
                },
                {
                    id: 'send_gmail',
                    type: 'action',
                    name: 'Send Gmail Notification',
                    config: {
                        service: 'gmail',
                        action: 'send_email',
                        to: 'admin@company.com',
                        subject: 'New Slack Message: {{channel}}'
                    }
                }
            ],
            triggers: [
                {
                    id: 'slack_webhook',
                    name: 'Slack Webhook',
                    description: 'Webhook for new Slack messages',
                    service: 'slack',
                    config: {
                        channel: '#general',
                        keywords: ['urgent', 'important']
                    }
                }
            ],
            isActive: true
        });

        return sampleWorkflow;
    }
}

