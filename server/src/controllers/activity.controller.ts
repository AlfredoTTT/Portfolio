import { Request, Response } from 'express';
import * as activityService from '../services/activity.service';

export const createActivity = async (req: Request, res: Response) => {
  try {
    const result = await activityService.createActivity(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create activity log' });
  }
};
