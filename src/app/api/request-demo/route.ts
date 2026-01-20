import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Log the form data (in production, you would send this via email)
    console.log('Demo Request Received:', {
      name,
      email,
      company,
      message,
      timestamp: new Date().toISOString()
    });

    // TODO: Add email sending logic here
    // Example: await sendEmail({ name, email, company, message });

    return NextResponse.json(
      { message: 'Demo request submitted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing demo request:', error);
    return NextResponse.json(
      { message: 'Error submitting demo request' },
      { status: 500 }
    );
  }
}
