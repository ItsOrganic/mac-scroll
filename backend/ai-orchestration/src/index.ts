import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { AIOrchestrationService } from './services/ai-orchestration-service';
import { aiRoutes } from './routes/ai';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Initialize services
const aiService = new AIOrchestrationService();

// Routes
app.use('/api/ai', aiRoutes(aiService));

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'ai-orchestration',
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
    logger.info(`AI Orchestration service running on port ${PORT}`);
});

export { app };

