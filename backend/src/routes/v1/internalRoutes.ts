import { Router } from 'express';
import * as noteController from '@/api/v1/internal/note/controller';

const router = Router();

/**
 * @summary Internal API routes configuration
 * @description Authenticated endpoints for application features
 */

/**
 * @summary Note routes
 */
router.post('/note', noteController.postHandler);

export default router;
