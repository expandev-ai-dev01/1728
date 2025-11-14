import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { noteCreate } from '@/services/note';
import { successResponse, errorResponse } from '@/utils/response';
import { zName, zString } from '@/utils/zodValidation';

/**
 * @api {post} /api/v1/internal/note Create Note
 * @apiName CreateNote
 * @apiGroup Note
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new note with title and content
 *
 * @apiParam {Number} idAccount Account identifier
 * @apiParam {Number} idUser User identifier
 * @apiParam {String} title Note title (max 255 characters)
 * @apiParam {String} content Note content
 *
 * @apiSuccess {Number} idNote Created note identifier
 *
 * @apiError {String} titleRequired Title is required
 * @apiError {String} titleExceedsMaximumLength Title exceeds 255 characters
 * @apiError {String} contentRequired Content is required
 * @apiError {String} userDoesNotExist User does not exist or is not authenticated
 * @apiError {String} INTERNAL_SERVER_ERROR Internal server error
 */

const bodySchema = z.object({
  idAccount: z.number().int().positive(),
  idUser: z.number().int().positive(),
  title: zName,
  content: zString,
});

export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Validate request body against schema
     */
    const validated = bodySchema.parse(req.body);

    /**
     * @rule {be-business-rule-001} Execute note creation with validated data
     */
    const result = await noteCreate({
      idAccount: validated.idAccount,
      idUser: validated.idUser,
      title: validated.title,
      content: validated.content,
    });

    res.status(201).json(successResponse(result));
  } catch (error: any) {
    /**
     * @remarks Handle specific business rule errors
     */
    if (error.number === 51000) {
      res.status(400).json(errorResponse(error.message, 'VALIDATION_ERROR'));
    } else if (error instanceof z.ZodError) {
      res
        .status(400)
        .json(errorResponse('Request validation failed', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}
