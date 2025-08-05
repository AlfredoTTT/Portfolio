import { Router } from 'express';
import { createVisit, updateVisit } from '../controllers/visit.controller';

const router = Router();

router.post('/', createVisit);
router.patch('/:id', updateVisit);

export default router;