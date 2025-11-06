import { Router, Request, Response } from 'express';
import { WorkflowEngine } from '../services/workflow-engine';
import { logger } from '../utils/logger';

export function workflowRoutes(workflowEngine: WorkflowEngine): Router {
    const router = Router();

    // Get all workflows for a user
    router.get('/', async (req: Request, res: Response) => {
        try {
            const { userId } = req.query;

            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }

            const workflows = await workflowEngine.getUserWorkflows(userId as string);
            res.json({ workflows });
        } catch (error) {
            logger.error('Error fetching workflows:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Get a specific workflow
    router.get('/:workflowId', async (req: Request, res: Response) => {
        try {
            const { workflowId } = req.params;
            const workflow = await workflowEngine.getWorkflow(workflowId);

            if (!workflow) {
                return res.status(404).json({ error: 'Workflow not found' });
            }

            res.json({ workflow });
        } catch (error) {
            logger.error('Error fetching workflow:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Create a new workflow
    router.post('/', async (req: Request, res: Response) => {
        try {
            const workflowData = req.body;
            const workflow = await workflowEngine.createWorkflow(workflowData);

            res.status(201).json({ workflow });
        } catch (error) {
            logger.error('Error creating workflow:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Update a workflow
    router.put('/:workflowId', async (req: Request, res: Response) => {
        try {
            const { workflowId } = req.params;
            const updates = req.body;

            const workflow = await workflowEngine.updateWorkflow(workflowId, updates);

            if (!workflow) {
                return res.status(404).json({ error: 'Workflow not found' });
            }

            res.json({ workflow });
        } catch (error) {
            logger.error('Error updating workflow:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Delete a workflow
    router.delete('/:workflowId', async (req: Request, res: Response) => {
        try {
            const { workflowId } = req.params;
            const deleted = await workflowEngine.deleteWorkflow(workflowId);

            if (!deleted) {
                return res.status(404).json({ error: 'Workflow not found' });
            }

            res.json({ message: 'Workflow deleted successfully' });
        } catch (error) {
            logger.error('Error deleting workflow:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Execute a workflow
    router.post('/:workflowId/execute', async (req: Request, res: Response) => {
        try {
            const { workflowId } = req.params;
            const triggerData = req.body;

            const execution = await workflowEngine.executeWorkflow(workflowId, triggerData);

            res.status(201).json({ execution });
        } catch (error) {
            logger.error('Error executing workflow:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Create sample workflow
    router.post('/sample', async (req: Request, res: Response) => {
        try {
            const { userId } = req.body;

            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }

            const workflow = await workflowEngine.createSampleWorkflow(userId);
            res.status(201).json({ workflow });
        } catch (error) {
            logger.error('Error creating sample workflow:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    return router;
}

