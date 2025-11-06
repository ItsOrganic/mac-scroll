import { Router, Request, Response } from 'express';
import { AIOrchestrationService } from '../services/ai-orchestration-service';
import { logger } from '../utils/logger';

export function aiRoutes(aiService: AIOrchestrationService): Router {
    const router = Router();

    // Generate workflow from natural language prompt
    router.post('/generate-workflow', async (req: Request, res: Response) => {
        try {
            const { prompt } = req.body;

            if (!prompt) {
                return res.status(400).json({ error: 'Prompt is required' });
            }

            const workflow = await aiService.generateWorkflowFromPrompt(prompt);
            res.json({ workflow });
        } catch (error) {
            logger.error('Error generating workflow:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Suggest transformations for data
    router.post('/suggest-transformations', async (req: Request, res: Response) => {
        try {
            const { data } = req.body;

            if (!data) {
                return res.status(400).json({ error: 'Data is required' });
            }

            const suggestions = await aiService.suggestTransformations(data);
            res.json({ suggestions });
        } catch (error) {
            logger.error('Error suggesting transformations:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Summarize text
    router.post('/summarize', async (req: Request, res: Response) => {
        try {
            const { text, maxLength = 200 } = req.body;

            if (!text) {
                return res.status(400).json({ error: 'Text is required' });
            }

            const summary = await aiService.summarizeText(text, maxLength);
            res.json({ summary });
        } catch (error) {
            logger.error('Error summarizing text:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Extract keywords
    router.post('/extract-keywords', async (req: Request, res: Response) => {
        try {
            const { text } = req.body;

            if (!text) {
                return res.status(400).json({ error: 'Text is required' });
            }

            const keywords = await aiService.extractKeywords(text);
            res.json({ keywords });
        } catch (error) {
            logger.error('Error extracting keywords:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Classify text
    router.post('/classify', async (req: Request, res: Response) => {
        try {
            const { text } = req.body;

            if (!text) {
                return res.status(400).json({ error: 'Text is required' });
            }

            const classification = await aiService.classifyText(text);
            res.json({ classification });
        } catch (error) {
            logger.error('Error classifying text:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Detect anomalies
    router.post('/detect-anomalies', async (req: Request, res: Response) => {
        try {
            const { data } = req.body;

            if (!data || !Array.isArray(data)) {
                return res.status(400).json({ error: 'Data array is required' });
            }

            const result = await aiService.detectAnomalies(data);
            res.json({ result });
        } catch (error) {
            logger.error('Error detecting anomalies:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    return router;
}

