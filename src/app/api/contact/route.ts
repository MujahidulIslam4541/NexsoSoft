import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    // Contact submission received and validated successfully
    return NextResponse.json({
      success: true,
      message: 'Message received successfully',
      data: {
        name,
        email,
        subject: subject || 'No Subject',
        receivedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error processing contact message:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
