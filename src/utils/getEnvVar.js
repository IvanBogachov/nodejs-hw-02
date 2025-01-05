import 'dotenv/config';

// Завантаження змінних середовища з файлу .env
// dotenv.config();

export const getEnvVar = (name, defaultValue) => {
  const value = process.env[name];
  console.log('APP_DOMAIN:', process.env.APP_DOMAIN);

  if (value) return value;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env['${name}'].`);
};
