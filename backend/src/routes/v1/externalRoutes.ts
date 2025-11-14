import { Router } from 'express';

const router = Router();

/**
 * @summary External API routes configuration
 * @description Public endpoints that do not require authentication
 */

/**
 * @summary Public routes placeholder
 * @description Add public routes here as needed
 */
router.get('/public/status', (req, res) => {
  res.json({
    status: 'online',
    message: 'NoteBox API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
