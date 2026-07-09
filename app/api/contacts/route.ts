
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Contact from '@/models/Contact';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { name, email, phone, message } = body;

    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await newContact.save();

    return NextResponse.json({ success: true, data: newContact });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Failed to send message' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Contact ID is required' }, { status: 400 });
    }

    await Contact.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Failed to delete contact' }, { status: 500 });
  }
}
