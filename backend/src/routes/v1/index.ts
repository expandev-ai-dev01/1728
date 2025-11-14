import { Router } from 'express';
import externalRoutes from '@/routes/v1/externalRoutes';
import internalRoutes from '@/routes/v1/internalRoutes';

const router = Router();

/**
 * @summary V1 API router configuration
 * @description Routes for API version 1
 */

/**
 * @summary External routes (public access)
 */
router.use('/external', externalRoutes);

/**
 * @summary Internal routes (authenticated access)
 */
router.use('/internal', internalRoutes);

export default router;
