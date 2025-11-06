import { BaseAdapter } from '../shared/base-adapter';
import { WorkflowTrigger, WorkflowAction } from '../shared/types';

export class GmailAdapter extends BaseAdapter {
    name = 'gmail';
    version = '1.0.0';

    async getTriggers(): Promise<WorkflowTrigger[]> {
        return [
            this.createTrigger(
                'new_email',
                'New Email',
                'Triggered when a new email is received',
                {
                    from: { type: 'string', required: false, description: 'Filter by sender email' },
                    subject: { type: 'string', required: false, description: 'Filter by subject keywords' },
                    label: { type: 'string', required: false, description: 'Filter by Gmail label' }
                }
            ),
            this.createTrigger(
                'email_with_attachment',
                'Email with Attachment',
                'Triggered when an email with attachments is received',
                {
                    attachment_types: { type: 'array', required: false, description: 'Filter by attachment file types' },
                    min_attachment_size: { type: 'number', required: false, description: 'Minimum attachment size in bytes' }
                }
            ),
            this.createTrigger(
                'important_email',
                'Important Email',
                'Triggered when an email is marked as important',
                {
                    from: { type: 'string', required: false, description: 'Filter by sender email' }
                }
            )
        ];
    }

    async getActions(): Promise<WorkflowAction[]> {
        return [
            this.createAction(
                'send_email',
                'Send Email',
                'Send an email via Gmail',
                [
                    { name: 'to', type: 'string', required: true, description: 'Recipient email address' },
                    { name: 'subject', type: 'string', required: true, description: 'Email subject' },
                    { name: 'body', type: 'string', required: true, description: 'Email body (HTML or plain text)' },
                    { name: 'cc', type: 'string', required: false, description: 'CC recipients' },
                    { name: 'bcc', type: 'string', required: false, description: 'BCC recipients' },
                    { name: 'attachments', type: 'array', required: false, description: 'File attachments' }
                ]
            ),
            this.createAction(
                'reply_to_email',
                'Reply to Email',
                'Reply to an existing email',
                [
                    { name: 'message_id', type: 'string', required: true, description: 'Gmail message ID to reply to' },
                    { name: 'body', type: 'string', required: true, description: 'Reply body' },
                    { name: 'attachments', type: 'array', required: false, description: 'File attachments' }
                ]
            ),
            this.createAction(
                'add_label',
                'Add Label',
                'Add a label to an email',
                [
                    { name: 'message_id', type: 'string', required: true, description: 'Gmail message ID' },
                    { name: 'label', type: 'string', required: true, description: 'Label name to add' }
                ]
            ),
            this.createAction(
                'mark_as_read',
                'Mark as Read',
                'Mark an email as read',
                [
                    { name: 'message_id', type: 'string', required: true, description: 'Gmail message ID' }
                ]
            ),
            this.createAction(
                'move_to_folder',
                'Move to Folder',
                'Move an email to a specific folder/label',
                [
                    { name: 'message_id', type: 'string', required: true, description: 'Gmail message ID' },
                    { name: 'folder', type: 'string', required: true, description: 'Destination folder/label name' }
                ]
            )
        ];
    }

    async executeTrigger(triggerId: string, config: Record<string, any>): Promise<any> {
        const { accessToken } = config;

        if (!accessToken) {
            throw new Error('Gmail access token is required');
        }

        switch (triggerId) {
            case 'new_email':
                return this.setupEmailWebhook(config);
            case 'email_with_attachment':
                return this.setupAttachmentWebhook(config);
            case 'important_email':
                return this.setupImportantEmailWebhook(config);
            default:
                throw new Error(`Unknown trigger: ${triggerId}`);
        }
    }

    async executeAction(actionId: string, config: Record<string, any>, input: Record<string, any>): Promise<any> {
        const { accessToken } = config;

        if (!accessToken) {
            throw new Error('Gmail access token is required');
        }

        switch (actionId) {
            case 'send_email':
                return this.sendEmail(accessToken, input);
            case 'reply_to_email':
                return this.replyToEmail(accessToken, input);
            case 'add_label':
                return this.addLabel(accessToken, input);
            case 'mark_as_read':
                return this.markAsRead(accessToken, input);
            case 'move_to_folder':
                return this.moveToFolder(accessToken, input);
            default:
                throw new Error(`Unknown action: ${actionId}`);
        }
    }

    async validateConfig(config: Record<string, any>): Promise<boolean> {
        return config.accessToken && typeof config.accessToken === 'string';
    }

    async testConnection(config: Record<string, any>): Promise<boolean> {
        try {
            const response = await this.makeRequest('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
                headers: {
                    'Authorization': `Bearer ${config.accessToken}`
                }
            });

            return response.ok;
        } catch (error) {
            console.error('Gmail connection test failed:', error);
            return false;
        }
    }

    private async setupEmailWebhook(config: Record<string, any>): Promise<any> {
        // In a real implementation, this would set up Gmail push notifications
        return { webhookId: `gmail_email_${Date.now()}` };
    }

    private async setupAttachmentWebhook(config: Record<string, any>): Promise<any> {
        return { webhookId: `gmail_attachment_${Date.now()}` };
    }

    private async setupImportantEmailWebhook(config: Record<string, any>): Promise<any> {
        return { webhookId: `gmail_important_${Date.now()}` };
    }

    private async sendEmail(accessToken: string, input: Record<string, any>): Promise<any> {
        const email = [
            `To: ${input.to}`,
            input.cc ? `Cc: ${input.cc}` : '',
            input.bcc ? `Bcc: ${input.bcc}` : '',
            `Subject: ${input.subject}`,
            'Content-Type: text/html; charset=utf-8',
            '',
            input.body
        ].filter(Boolean).join('\n');

        const encodedEmail = Buffer.from(email).toString('base64url');

        const response = await this.makeRequest('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                raw: encodedEmail
            })
        });

        return await response.json();
    }

    private async replyToEmail(accessToken: string, input: Record<string, any>): Promise<any> {
        // First get the original message to construct the reply
        const messageResponse = await this.makeRequest(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${input.message_id}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );

        const message = await messageResponse.json();
        const headers = message.payload.headers;
        const subject = headers.find((h: any) => h.name === 'Subject')?.value || '';
        const from = headers.find((h: any) => h.name === 'From')?.value || '';

        const replyEmail = [
            `To: ${from}`,
            `Subject: Re: ${subject}`,
            'Content-Type: text/html; charset=utf-8',
            '',
            input.body
        ].join('\n');

        const encodedEmail = Buffer.from(replyEmail).toString('base64url');

        const response = await this.makeRequest('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                raw: encodedEmail,
                threadId: message.threadId
            })
        });

        return await response.json();
    }

    private async addLabel(accessToken: string, input: Record<string, any>): Promise<any> {
        const response = await this.makeRequest(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${input.message_id}/modify`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    addLabelIds: [input.label]
                })
            }
        );

        return await response.json();
    }

    private async markAsRead(accessToken: string, input: Record<string, any>): Promise<any> {
        const response = await this.makeRequest(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${input.message_id}/modify`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    removeLabelIds: ['UNREAD']
                })
            }
        );

        return await response.json();
    }

    private async moveToFolder(accessToken: string, input: Record<string, any>): Promise<any> {
        const response = await this.makeRequest(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${input.message_id}/modify`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    addLabelIds: [input.folder]
                })
            }
        );

        return await response.json();
    }
}

