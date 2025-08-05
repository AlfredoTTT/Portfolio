export interface CreateVisitLogDto {
  token?: string;
  userAgent: string;
  language: string;
  timezone: string;
  browser: string;
  os: string;
  region: string;
  screenResolution: string;
  ip: string;
}

export interface UpdateVisitLogDto {
  userAgent?: string;
  language?: string;
  timezone?: string;
  browser?: string;
  os?: string;
  region?: string;
  screenResolution?: string;
  ip?: string;
}