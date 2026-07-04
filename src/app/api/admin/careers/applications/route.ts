import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET: List all applications (optionally filtered by jobId)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');
    const status = searchParams.get('status');

    const where: any = {};
    if (jobId) where.jobId = jobId;
    if (status) where.status = status;

    const applications = await prisma.careerApplication.findMany({
      where,
      orderBy: { appliedAt: 'desc' },
      include: {
        job: { select: { title: true, department: true } },
      },
    });

    return NextResponse.json({ success: true, data: applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Update application status
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, payload } = body;

    if (action === 'updateStatus') {
      const { id, status } = payload;
      const validStatuses = ['pending', 'reviewed', 'shortlisted', 'rejected'];
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
      }

      const result = await prisma.careerApplication.update({
        where: { id },
        data: { status },
      });

      return NextResponse.json({ success: true, data: result });
    }

    if (action === 'deleteApplication') {
      const { id } = payload;
      await prisma.careerApplication.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Unsupported action' }, { status: 400 });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
