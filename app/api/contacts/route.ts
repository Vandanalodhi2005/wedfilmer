
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Contact from '@/models/Contact';
import { verifyToken } from '@/lib/auth';
import nodemailer from 'nodemailer';

export async function GET(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded && process.env.NODE_ENV === 'production') {
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

    console.log('Received contact form submission:', { name, email, phone, message });

    // 1. Save to database first (critical)
    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await newContact.save();
    console.log('Contact saved to database successfully');

    // 2. Try sending email (non-blocking, don't fail the whole request if email fails)
    try {
      // Check if all SMTP variables are present
      const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
      if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
        console.warn('SMTP configuration missing, skipping email send');
      } else {
        console.log('Creating SMTP transporter with host:', SMTP_HOST, 'port:', SMTP_PORT);
        
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: Number(SMTP_PORT),
          secure: SMTP_SECURE === 'true',
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
        });

        // Verify transporter connection
        await transporter.verify();
        console.log('SMTP transporter verified successfully');

        // Email content with HTML content
        const mailOptions = {
          from: SMTP_USER,
          to: 'info@wedfilmer.in',
          subject: `New Contact Form Submission from ${name}`,
          text: `
You have received a new contact form submission!

Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
          `,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message}</p>
          `,
        };

        console.log('Sending email with options:', { from: mailOptions.from, to: mailOptions.to, subject: mailOptions.subject });
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
      }
    } catch (emailError) {
      console.error('Email sending failed with details:', emailError);
      // Don't rethrow - just log, since we already saved contact to DB
    }

    return NextResponse.json({ success: true, data: newContact });
  } catch (error) {
    console.error('Error saving contact:', error);
    return NextResponse.json({ success: false, message: 'Failed to save message' }, { status: 500 });
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
      return NextResponse.json({ success: false, message: 'Contact ID is required' }, { status: 400 });
    }

    await Contact.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Failed to delete contact' }, { status: 500 });
  }
}
