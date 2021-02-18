export enum Environment {
  Test = 'test',
  Local = 'local',
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

export enum EnvironmentVariables {
  ENV = 'ENV',
  DATABASE_URL = 'DATABASE_URL',
  REDIS_URL = 'REDIS_URL',
  JWT_SECRET = 'JWT_SECRET',
  JWT_ACCESS_TTL = 'JWT_ACCESS_TTL',
  JWT_REFRESH_TTL = 'JWT_REFRESH_TTL',
  COOKIES_SECRET = 'COOKIES_SECRET',
  GOOGLE_OAUTH2_CLIENT_ID = 'GOOGLE_OAUTH2_CLIENT_ID',
  GOOGLE_OAUTH2_CLIENT_SECRET = 'GOOGLE_OAUTH2_CLIENT_SECRET',
}
