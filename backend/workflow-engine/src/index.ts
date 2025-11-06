import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { WorkflowEngine } from './services/workflow-engine';
import { ExecutionService } from './services/execution-service';
import { QueueService } from './services/queue-service';
import { workflowRoutes } from './routes/workflows';
import { executionRoutes } from './routes/executions';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Initialize services
const queueService = new QueueService();
const executionService = new ExecutionService(queueService);
const workflowEngine = new WorkflowEngine(executionService);

// Routes
app.use('/api/workflows', workflowRoutes(workflowEngine));
app.use('/api/executions', executionRoutes(executionService));

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'workflow-engine',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// Start server
app.listen(PORT, () => {
    logger.info(`Workflow Engine service running on port ${PORT}`);
});

export { app };

