import type { Config } from 'drizzle-kit';

export default {
  schema: './src/shared/database/schema',
  out: './src/shared/database/migrations',
  dialect: 'sqlite',
  driver: 'expo',
} satisfies Config; 