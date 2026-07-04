import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// GET: List all career jobs (admin)
export async function GET() {
  try {
    const jobs = await prisma.careerJob.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { applications: true } },
      },
    });

    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    console.error('Error fetching admin careers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Create, Update, Delete, Toggle career jobs (admin)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, payload } = body;

    if (!action || !payload) {
      return NextResponse.json({ error: 'Action and payload are required' }, { status: 400 });
    }

    let result: any = null;

    switch (action) {
      case 'createJob': {
        const { title, department, location, type, description, requirements, salaryRange } = payload;
        result = await prisma.careerJob.create({
          data: {
            title: title.trim(),
            department: department.trim(),
            location: location.trim(),
            type,
            description: description.trim(),
            requirements: requirements.trim(),
            salaryRange: salaryRange?.trim() || null,
          },
        });
        break;
      }

      case 'updateJob': {
        const { id, title, department, location, type, description, requirements, salaryRange } = payload;
        result = await prisma.careerJob.update({
          where: { id },
          data: {
            title: title.trim(),
            department: department.trim(),
            location: location.trim(),
            type,
            description: description.trim(),
            requirements: requirements.trim(),
            salaryRange: salaryRange?.trim() || null,
          },
        });
        break;
      }

      case 'toggleJob': {
        const { id, isActive } = payload;
        result = await prisma.careerJob.update({
          where: { id },
          data: { isActive },
        });
        break;
      }

      case 'deleteJob': {
        const { id } = payload;
        result = await prisma.careerJob.delete({ where: { id } });
        break;
      }

      default:
        return NextResponse.json({ error: `Unsupported action: ${action}` }, { status: 400 });
    }

    revalidatePath('/careers');

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error managing career job:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
