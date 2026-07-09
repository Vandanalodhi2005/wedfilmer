
import { v2 as cloudinary } from 'cloudinary';

console.log('Configuring Cloudinary...', {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME ? 'set' : 'not set',
  apiKey: process.env.CLOUDINARY_API_KEY ? 'set' : 'not set',
  apiSecret: process.env.CLOUDINARY_API_SECRET ? 'set' : 'not set'
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
