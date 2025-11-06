import { BaseAdapter } from '../shared/base-adapter';
import { WorkflowTrigger, WorkflowAction } from '../shared/types';

export class SlackAdapter extends BaseAdapter {
    name = 'slack';
    version = '1.0.0';

    async getTriggers(): Promise<WorkflowTrigger[]> {
        return [
            this.createTrigger(
                'new_message',
                'New Message',
                'Triggered when a new message is posted in a channel',
                {
                    channel: { type: 'string', required: true, description: 'Channel ID or name' },
                    keywords: { type: 'array', required: false, description: 'Keywords to filter messages' }
                }
            ),
            this.createTrigger(
                'mention',
                'Mention',
                'Triggered when the bot is mentioned in a message',
                {
                    channel: { type: 'string', required: false, description: 'Specific channel to monitor' }
                }
            ),
            this.createTrigger(
                'reaction_added',
                'Reaction Added',
                'Triggered when a reaction is added to a message',
                {
                    emoji: { type: 'string', required: false, description: 'Specific emoji to monitor' }
                }
            )
        ];
    }

    async getActions(): Promise<WorkflowAction[]> {
        return [
            this.createAction(
                'send_message',
                'Send Message',
                'Send a message to a Slack channel',
                [
                    { name: 'channel', type: 'string', required: true, description: 'Channel ID or name' },
                    { name: 'text', type: 'string', required: true, description: 'Message text' },
                    { name: 'blocks', type: 'array', required: false, description: 'Rich message blocks' },
                    { name: 'thread_ts', type: 'string', required: false, description: 'Thread timestamp for replies' }
                ]
            ),
            this.createAction(
                'update_message',
                'Update Message',
                'Update an existing message',
                [
                    { name: 'channel', type: 'string', required: true, description: 'Channel ID' },
                    { name: 'ts', type: 'string', required: true, description: 'Message timestamp' },
                    { name: 'text', type: 'string', required: true, description: 'New message text' }
                ]
            ),
            this.createAction(
                'add_reaction',
                'Add Reaction',
                'Add a reaction to a message',
                [
                    { name: 'channel', type: 'string', required: true, description: 'Channel ID' },
                    { name: 'timestamp', type: 'string', required: true, description: 'Message timestamp' },
                    { name: 'name', type: 'string', required: true, description: 'Emoji name (without colons)' }
                ]
            ),
            this.createAction(
                'create_channel',
                'Create Channel',
                'Create a new Slack channel',
                [
                    { name: 'name', type: 'string', required: true, description: 'Channel name' },
                    { name: 'is_private', type: 'boolean', required: false, description: 'Make channel private', defaultValue: false }
                ]
            )
        ];
    }

    async executeTrigger(triggerId: string, config: Record<string, any>): Promise<any> {
        const { botToken } = config;

        if (!botToken) {
            throw new Error('Slack bot token is required');
        }

        switch (triggerId) {
            case 'new_message':
                return this.setupMessageWebhook(config);
            case 'mention':
                return this.setupMentionWebhook(config);
            case 'reaction_added':
                return this.setupReactionWebhook(config);
            default:
                throw new Error(`Unknown trigger: ${triggerId}`);
        }
    }

    async executeAction(actionId: string, config: Record<string, any>, input: Record<string, any>): Promise<any> {
        const { botToken } = config;

        if (!botToken) {
            throw new Error('Slack bot token is required');
        }

        switch (actionId) {
            case 'send_message':
                return this.sendMessage(botToken, input);
            case 'update_message':
                return this.updateMessage(botToken, input);
            case 'add_reaction':
                return this.addReaction(botToken, input);
            case 'create_channel':
                return this.createChannel(botToken, input);
            default:
                throw new Error(`Unknown action: ${actionId}`);
        }
    }

    async validateConfig(config: Record<string, any>): Promise<boolean> {
        return config.botToken && typeof config.botToken === 'string';
    }

    async testConnection(config: Record<string, any>): Promise<boolean> {
        try {
            const response = await this.makeRequest('https://slack.com/api/auth.test', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${config.botToken}`
                }
            });

            const data = await response.json();
            return data.ok === true;
        } catch (error) {
            console.error('Slack connection test failed:', error);
            return false;
        }
    }

    private async setupMessageWebhook(config: Record<string, any>): Promise<any> {
        // In a real implementation, this would set up webhook subscriptions
        return { webhookId: `slack_message_${Date.now()}` };
    }

    private async setupMentionWebhook(config: Record<string, any>): Promise<any> {
        return { webhookId: `slack_mention_${Date.now()}` };
    }

    private async setupReactionWebhook(config: Record<string, any>): Promise<any> {
        return { webhookId: `slack_reaction_${Date.now()}` };
    }

    private async sendMessage(botToken: string, input: Record<string, any>): Promise<any> {
        const response = await this.makeRequest('https://slack.com/api/chat.postMessage', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${botToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                channel: input.channel,
                text: input.text,
                blocks: input.blocks,
                thread_ts: input.thread_ts
            })
        });

        return await response.json();
    }

    private async updateMessage(botToken: string, input: Record<string, any>): Promise<any> {
        const response = await this.makeRequest('https://slack.com/api/chat.update', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${botToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                channel: input.channel,
                ts: input.ts,
                text: input.text
            })
        });

        return await response.json();
    }

    private async addReaction(botToken: string, input: Record<string, any>): Promise<any> {
        const response = await this.makeRequest('https://slack.com/api/reactions.add', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${botToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                channel: input.channel,
                timestamp: input.timestamp,
                name: input.name
            })
        });

        return await response.json();
    }

    private async createChannel(botToken: string, input: Record<string, any>): Promise<any> {
        const response = await this.makeRequest('https://slack.com/api/conversations.create', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${botToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: input.name,
                is_private: input.is_private || false
            })
        });

        return await response.json();
    }
}

