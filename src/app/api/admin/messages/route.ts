import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET: Fetch all messages
export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: messages });
  } catch (error: any) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE: Delete a specific message by ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    await prisma.contactMessage.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Message deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
