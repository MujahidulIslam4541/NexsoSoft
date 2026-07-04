import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject: subject || 'No Subject',
        message,
      },
    });

    return NextResponse.json({ success: true, data: newMessage });
  } catch (error: any) {
    console.error('Error saving contact message:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
