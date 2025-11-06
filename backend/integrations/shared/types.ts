// Shared types for integration adapters

export interface WorkflowTrigger {
    id: string;
    name: string;
    description: string;
    service: string;
    config: Record<string, any>;
    webhookUrl?: string;
}

export interface WorkflowAction {
    id: string;
    name: string;
    description: string;
    service: string;
    config: Record<string, any>;
    inputs: ActionInput[];
}

export interface ActionInput {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'object' | 'array';
    required: boolean;
    description: string;
    defaultValue?: any;
}

export interface WorkflowStep {
    id: string;
    type: 'trigger' | 'action' | 'condition' | 'transform';
    name: string;
    config: Record<string, any>;
    nextSteps?: string[];
    condition?: {
        field: string;
        operator: 'equals' | 'contains' | 'greater_than' | 'less_than';
        value: any;
    };
}

export interface WorkflowExecution {
    id: string;
    workflowId: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
    startedAt: Date;
    completedAt?: Date;
    steps: WorkflowStepExecution[];
    data: Record<string, any>;
    error?: string;
}

export interface WorkflowStepExecution {
    id: string;
    stepId: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
    startedAt: Date;
    completedAt?: Date;
    input: Record<string, any>;
    output?: Record<string, any>;
    error?: string;
    retryCount: number;
}

export interface IntegrationAdapter {
    name: string;
    version: string;
    getTriggers(): Promise<WorkflowTrigger[]>;
    getActions(): Promise<WorkflowAction[]>;
    executeTrigger(triggerId: string, config: Record<string, any>): Promise<any>;
    executeAction(actionId: string, config: Record<string, any>, input: Record<string, any>): Promise<any>;
    validateConfig(config: Record<string, any>): Promise<boolean>;
    testConnection(config: Record<string, any>): Promise<boolean>;
}

export interface AITransformation {
    id: string;
    name: string;
    description: string;
    type: 'summarize' | 'classify' | 'extract_keywords' | 'detect_anomaly' | 'translate' | 'sentiment';
    config: Record<string, any>;
    execute(input: any): Promise<any>;
}

export interface WorkflowDefinition {
    id: string;
    name: string;
    description: string;
    userId: string;
    teamId?: string;
    steps: WorkflowStep[];
    triggers: WorkflowTrigger[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    executionCount: number;
    lastExecutedAt?: Date;
}

