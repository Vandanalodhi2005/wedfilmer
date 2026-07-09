
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import cloudinary from '@/lib/cloudinary';
import Image from '@/models/Image';

export async function POST(request: NextRequest) {
  try {
    console.log('=== TEST UPLOAD START ===');
    
    console.log('1. Connecting to MongoDB...');
    await connectToDatabase();
    console.log('1. MongoDB connected');
    
    console.log('2. Parsing request...');
    const body = await request.json();
    console.log('2. Request parsed', body);
    
    console.log('3. Uploading to Cloudinary...');
    const uploadResult = await cloudinary.uploader.upload(body.url, {
      folder: "wedfilmer/test",
    });
    console.log('3. Cloudinary upload done', uploadResult);
    
    console.log('4. Creating image document...');
    const newImage = new Image({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      category: 'Wedding',
    });
    console.log('4. Document created');
    
    console.log('5. Saving to MongoDB...');
    await newImage.save();
    console.log('5. Saved to MongoDB');
    
    console.log('=== TEST UPLOAD SUCCESS ===');
    return NextResponse.json({ success: true, data: newImage });
  } catch (error) {
    console.error('=== TEST UPLOAD FAILED ===', error);
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
