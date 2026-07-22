
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import cloudinary from '@/lib/cloudinary';
import Video from '@/models/Video';
import { verifyToken } from '@/lib/auth';

// Allow longer timeout for large video uploads (default is 60 seconds)
export const maxDuration = 120;

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const query = category ? { category } : {};
    const videos = await Video.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: videos });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Failed to fetch videos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();
    const { base64, url, category } = body;

    let uploadResult;
    if (base64) {
      uploadResult = await cloudinary.uploader.upload(base64, {
        folder: "wedfilmer/videos",
        resource_type: "video",
      });
    } else if (url) {
      uploadResult = await cloudinary.uploader.upload(url, {
        folder: "wedfilmer/videos",
        resource_type: "video",
      });
    } else {
      return NextResponse.json({ success: false, message: "Either base64 or url is required" }, { status: 400 });
    }

    const newVideo = new Video({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      category,
    });

    await newVideo.save();

    return NextResponse.json({ success: true, data: newVideo });
  } catch (error) {
    console.error('Error uploading video:', error);
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json({ 
      success: false, 
      message: "Failed to upload video", 
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
      return NextResponse.json({ success: false, message: 'Video ID is required' }, { status: 400 });
    }

    const video = await Video.findById(id);
    if (!video) {
      return NextResponse.json({ success: false, message: 'Video not found' }, { status: 404 });
    }

    await cloudinary.uploader.destroy(video.publicId, { resource_type: 'video' });
    await Video.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Video deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Failed to delete video' }, { status: 500 });
  }
}
