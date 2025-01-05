import cloudinary from 'cloudinary';
import { getEnvVar } from './getEnvVar.js';
import { CLOUDINARY } from '../constants/index.js';
import fs from 'node:fs/promises';

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
  api_key: getEnvVar(CLOUDINARY.API_KEY),
  api_secret: getEnvVar(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
// import cloudinary from 'cloudinary';
// import { getEnvVar } from './getEnvVar.js';
// import { CLOUDINARY } from '../constants/index.js';
// import fs from 'node:fs/promises';

// cloudinary.v2.config({
//   secure: true,
//   cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
//   api_key: getEnvVar(CLOUDINARY.API_KEY),
//   api_secret: getEnvVar(CLOUDINARY.API_SECRET),
// });

// export const saveFileToCloudinary = async (file) => {
//   console.log('Starting file upload to Cloudinary...');
//   console.log('File path:', file.path);

//   try {
//     const response = await cloudinary.v2.uploader.upload(file.path);
//     console.log('Cloudinary upload successful. Response:', response);

//     console.log('Deleting local file:', file.path);
//     await fs.unlink(file.path);
//     console.log('Local file deleted successfully.');

//     return response.secure_url;
//   } catch (err) {
//     console.error('Error during Cloudinary upload or file deletion:', err);
//     throw err;
//   }
// };
