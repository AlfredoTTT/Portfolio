import { DataSource } from 'typeorm';
import { InviteToken } from '../entity/InviteToken';
import { VisitLog } from '../entity/VisitLog';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.DB_HOST || !process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  throw new Error('❌ Missing database configuration in .env');
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [InviteToken, VisitLog],
  migrations: [__dirname + '/migration/*.ts'],
});
