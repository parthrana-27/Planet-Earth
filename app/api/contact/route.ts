import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend only if API key is present
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    console.log(`📩 New message from ${name} (${email}): ${message}`);

    // If no API key, check if we are in development to allow testing
    if (!resend) {
      if (process.env.NODE_ENV === 'development') {
        console.log('⚠️ RESEND_API_KEY is missing. In development mode, skipping email send and returning mock success.');
        // Simulate a slight delay for better UX testing
        await new Promise(resolve => setTimeout(resolve, 1000));
        return NextResponse.json({ 
          success: true, 
          message: 'Message logged to console (Development Mode)' 
        });
      }
      
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'your-email@example.com'],
      subject: `✨ New Portfolio Message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff; padding: 40px; border-radius: 24px; border: 1px solid rgba(255, 255, 255, 0.1);">
          <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 24px;">New Contact Message</h2>
          <div style="margin-bottom: 24px; padding: 20px; background-color: rgba(255, 255, 255, 0.05); border-radius: 16px;">
            <p style="color: rgba(255, 255, 255, 0.5); font-size: 12px; text-transform: uppercase;">From</p>
            <p style="font-size: 16px;">${name} (${email})</p>
          </div>
          <div style="margin-bottom: 24px; padding: 20px; background-color: rgba(255, 255, 255, 0.05); border-radius: 16px;">
            <p style="color: rgba(255, 255, 255, 0.5); font-size: 12px; text-transform: uppercase;">Message</p>
            <p style="font-size: 16px;">${message}</p>
          </div>
          <div style="text-align: center; color: rgba(255, 255, 255, 0.3); font-size: 12px;">Sent from Planet Earth Portfolio</div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
