export const development = {
  // DATABASE_URL: 'postgres://postgres:andela@localhost:5432/myDiary',
  PORT: process.env.PORT,
  SECRET: '',
  POOL: {},
};
export const production = {
  environment: 'production',
  PORT: process.env.PORT,
  SECRET: process.env.SECRET_KEY,
  POOL: {},
};