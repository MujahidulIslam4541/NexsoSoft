import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET: Fetch all active career job listings (public)
export async function GET() {
  try {
    const jobs = await prisma.careerJob.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        department: true,
        location: true,
        type: true,
        salaryRange: true,
        createdAt: true,
        _count: { select: { applications: true } },
      },
    });

    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    console.error('Error fetching careers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
