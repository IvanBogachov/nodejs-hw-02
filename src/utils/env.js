import dotenv from 'dotenv';

// Завантаження змінних середовища з файлу .env
dotenv.config();

export const env = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};
