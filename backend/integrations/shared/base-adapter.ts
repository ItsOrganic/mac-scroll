import { IntegrationAdapter, WorkflowTrigger, WorkflowAction } from './types';

export abstract class BaseAdapter implements IntegrationAdapter {
    abstract name: string;
    abstract version: string;

    abstract getTriggers(): Promise<WorkflowTrigger[]>;
    abstract getActions(): Promise<WorkflowAction[]>;
    abstract executeTrigger(triggerId: string, config: Record<string, any>): Promise<any>;
    abstract executeAction(actionId: string, config: Record<string, any>, input: Record<string, any>): Promise<any>;

    async validateConfig(config: Record<string, any>): Promise<boolean> {
        // Base validation - can be overridden by specific adapters
        return config && typeof config === 'object';
    }

    async testConnection(config: Record<string, any>): Promise<boolean> {
        // Base connection test - should be implemented by specific adapters
        try {
            await this.validateConfig(config);
            return true;
        } catch (error) {
            console.error(`Connection test failed for ${this.name}:`, error);
            return false;
        }
    }

    protected createTrigger(
        id: string,
        name: string,
        description: string,
        config: Record<string, any> = {},
        webhookUrl?: string
    ): WorkflowTrigger {
        return {
            id,
            name,
            description,
            service: this.name,
            config,
            webhookUrl
        };
    }

    protected createAction(
        id: string,
        name: string,
        description: string,
        inputs: any[] = [],
        config: Record<string, any> = {}
    ): WorkflowAction {
        return {
            id,
            name,
            description,
            service: this.name,
            config,
            inputs
        };
    }

    protected async makeRequest(
        url: string,
        options: RequestInit = {}
    ): Promise<Response> {
        const defaultOptions: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        };

        const response = await fetch(url, { ...defaultOptions, ...options });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
    }
}

