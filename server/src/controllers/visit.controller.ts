import { Request, Response } from 'express';
import * as visitLogService from '../services/visit.service';

export const createVisit = async (req: Request, res: Response) => {
  try {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const result = await visitLogService.createVisit({ ...req.body, ip });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create visit log' });
  }
};

export const updateVisit = async (req: Request, res: Response) => {
  try {
    const result = await visitLogService.updateVisit(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update visit log' });
  }
};
