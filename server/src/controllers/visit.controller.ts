import { Request, Response } from 'express';
import * as visitLogService from '../services/visit.service';
/**
 * @swagger
 * /api/visitlog:
 *   post:
 *     summary: Create a new VisitLog entry
 *     tags: [VisitLog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateVisitLogDto'
 *     responses:
 *       201:
 *         description: VisitLog created successfully
 *       500:
 *         description: Server error
 */
export const createVisit = async (req: Request, res: Response) => {
  try {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const result = await visitLogService.createVisit({ ...req.body, ip });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create visit log' });
  }
};
/**
 * @swagger
 * /api/visitlog/{id}:
 *   patch:
 *     summary: Update an existing VisitLog entry
 *     tags: [VisitLog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the VisitLog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateVisitLogDto'
 *     responses:
 *       200:
 *         description: VisitLog updated successfully
 *       500:
 *         description: Server error
 */
export const updateVisit = async (req: Request, res: Response) => {
  try {
    const result = await visitLogService.updateVisit(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update visit log' });
  }
};
