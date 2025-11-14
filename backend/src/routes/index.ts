import { Router } from 'express';
import v1Routes from '@/routes/v1';

const router = Router();

/**
 * @summary API Version routing
 * @description Main router configuration for API versioning
 */

/**
 * @summary Version 1 routes
 */
router.use('/v1', v1Routes);

export default router;
