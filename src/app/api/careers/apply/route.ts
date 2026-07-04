import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// POST: Submit a job application (public)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jobId, name, email, phone, coverLetter, portfolioUrl, cvUrl } = body;

    if (!jobId || !name || !email || !phone || !coverLetter || !cvUrl) {
      return NextResponse.json(
        { error: 'All required fields must be filled.' },
        { status: 400 }
      );
    }

    // Verify job exists and is active
    const job = await prisma.careerJob.findUnique({
      where: { id: jobId, isActive: true },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job posting not found or no longer active.' }, { status: 404 });
    }

    // Check for duplicate application (same email for same job)
    const existing = await prisma.careerApplication.findFirst({
      where: { jobId, email },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'You have already applied for this position.' },
        { status: 409 }
      );
    }

    const application = await prisma.careerApplication.create({
      data: {
        jobId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        coverLetter: coverLetter.trim(),
        portfolioUrl: portfolioUrl?.trim() || null,
        cvUrl: cvUrl.trim(),
      },
    });

    return NextResponse.json({ success: true, data: application });
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
