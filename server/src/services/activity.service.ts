import { AppDataSource } from '../config/orm.config';
import { UserActivityLog } from '../entity/UserActivityLog';
import { CreateUserActivityLogDto } from '../dto/activity.dto';
export const createActivity = async (data: CreateUserActivityLogDto) => {
  const repo = AppDataSource.getRepository(UserActivityLog);
  const activity = repo.create(data);
  return await repo.save(activity);
};