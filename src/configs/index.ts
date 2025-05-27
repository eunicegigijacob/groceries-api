import * as dotenv from 'dotenv';

dotenv.config();

export const configs = {
  SERVER_PORT: process.env.SERVER_PORT || 3000,

  JWT_SECRET: process.env.JWT_SECRET || 'test',

  MONGODB_URL: process.env.MONGODB_URL || '',
};
