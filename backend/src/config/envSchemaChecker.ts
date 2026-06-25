import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env
dotenv.config();

// Schema for environment Variable (.env file) configuration validation
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  PORT: z.coerce.number().default(() => {
    console.warn('⚠️  WARNING: PORT is missing in .env! Defaulting to 3000.');
    return 3000;
  }),
});

const parsed = envSchema.safeParse(process.env);
// returns { sucess: flase, data: { PORT: 3000, NODE_ENV: 'development' } }

if (!parsed.success) {
  console.error('❌ Environment configuration validation failed:', parsed.error.format());
  process.exit(1);
}

// Using const to make it readable from now on
export const config = parsed.data;
export type Config = z.infer<typeof envSchema>;
