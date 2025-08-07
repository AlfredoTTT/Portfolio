import { Request, Response } from 'express';
import * as activityService from '../services/activity.service'

/**
 * @swagger
 * /api/useractivitylog:
 *   post:
 *     summary: Create a new UserActivityLog entry
 *     tags: [UserActivityLog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserActivityLogDto'
 *     responses:
 *       201:
 *         description: ActivityLog created successfully
 *       500:
 *         description: Server error
 */

export const createActivity = async (req: Request, res: Response) => {
  try {
    const result = await activityService.createActivity(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create activity log' });
  }
};
