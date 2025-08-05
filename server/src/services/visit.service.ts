import { AppDataSource } from '../config/orm.config';
import { VisitLog } from '../entity/VisitLog';
import { CreateVisitLogDto, UpdateVisitLogDto } from '../dto/visit.dto';

export const createVisit = async (data: CreateVisitLogDto) => {
  const repo = AppDataSource.getRepository(VisitLog);
  const visit = repo.create(data);
  return await repo.save(visit);
};

export const updateVisit = async (id: string, updates: UpdateVisitLogDto) => {
  const repo = AppDataSource.getRepository(VisitLog);
  await repo.update(id, updates);
  return await repo.findOneBy({ id });
};