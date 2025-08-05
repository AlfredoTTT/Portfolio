export interface CreateUserActivityLogDto {
  visitId?: string;
  action: string;
  target: string;
  details?: string;
}