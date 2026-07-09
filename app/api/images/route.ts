
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import cloudinary from '@/lib/cloudinary';
import Image from '@/models/Image';
import { verifyToken } from '@/lib/auth';

// Allow longer timeout for large file uploads
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const query = category ? { category } : {};
    const images = await Image.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Failed to fetch images' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Step 1: Verifying token...');
    const decoded = verifyToken(request);
    if (!decoded && process.env.NODE_ENV === 'production') {
      console.log('Step 1 failed: Unauthorized');
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    console.log('Step 1 passed: Token verified');

    console.log('Step 2: Connecting to database...');
    await connectToDatabase();
    console.log('Step 2 passed: Database connected');

    console.log('Step 3: Parsing request body...');
    const body = await request.json();
    const { base64, url, category } = body;
    console.log('Step 3 passed: Body parsed', { hasBase64: !!base64, hasUrl: !!url, category });

    console.log('Step 4: Uploading to Cloudinary...');
    let uploadResult;
    if (base64) {
      uploadResult = await cloudinary.uploader.upload(base64, {
        folder: "wedfilmer/images",
      });
    } else if (url) {
      uploadResult = await cloudinary.uploader.upload(url, {
        folder: "wedfilmer/images",
      });
    } else {
      console.log('Step 4 failed: No base64 or url');
      return NextResponse.json({ success: false, message: "Either base64 or url is required" }, { status: 400 });
    }
    console.log('Step 4 passed: Uploaded to Cloudinary', { publicId: uploadResult.public_id, secureUrl: uploadResult.secure_url });

    console.log('Step 5: Creating image document...');
    const newImage = new Image({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      category,
    });
    console.log('Step 5 passed: Document created');

    console.log('Step 6: Saving image to database...');
    await newImage.save();
    console.log('Step 6 passed: Image saved');

    return NextResponse.json({ success: true, data: newImage });
  } catch (error) {
    console.error('Error uploading image:', error);
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json({ 
      success: false, 
      message: "Failed to upload image", 
      error: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Image ID is required' }, { status: 400 });
    }

    const image = await Image.findById(id);
    if (!image) {
      return NextResponse.json({ success: false, message: 'Image not found' }, { status: 404 });
    }

    await cloudinary.uploader.destroy(image.publicId);
    await Image.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Failed to delete image' }, { status: 500 });
  }
}
