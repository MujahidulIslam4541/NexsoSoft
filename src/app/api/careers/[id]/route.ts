import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET: Fetch single job details by ID (public)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const job = await prisma.careerJob.findUnique({
      where: { id, isActive: true },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
