import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// GET: Fetch all website contents for admin editing
export async function GET() {
  try {
    const [hero, features, processSteps, stats, testimonials, faqs] = await Promise.all([
      prisma.heroSettings.findUnique({ where: { id: 'hero' } }),
      prisma.featureItem.findMany({ orderBy: { order: 'asc' } }),
      prisma.processStep.findMany({ orderBy: { stepNumber: 'asc' } }),
      prisma.statItem.findMany(),
      prisma.testimonialItem.findMany(),
      prisma.fAQItem.findMany({ orderBy: { order: 'asc' } }),
    ]);

    return NextResponse.json({
      success: true,
      data: { hero, features, processSteps, stats, testimonials, faqs },
    });
  } catch (error: any) {
    console.error('Error fetching admin content:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Manage updates (Create, Update, Delete) for different sections
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, payload } = body;

    if (!action || !payload) {
      return NextResponse.json({ error: 'Action and payload are required' }, { status: 400 });
    }

    let result: any = null;

    switch (action) {
      // ─── HERO SETTINGS ──────────────────────────────────────────
      case 'updateHero': {
        const { title, subtitle, ctaText, ctaHref } = payload;
        result = await prisma.heroSettings.upsert({
          where: { id: 'hero' },
          update: { title, subtitle, ctaText, ctaHref },
          create: { id: 'hero', title, subtitle, ctaText, ctaHref },
        });
        break;
      }

      // ─── FEATURES ───────────────────────────────────────────────
      case 'upsertFeature': {
        const { id, title, description, iconName, order } = payload;
        if (id) {
          result = await prisma.featureItem.update({
            where: { id },
            data: { title, description, iconName, order: parseInt(order) || 0 },
          });
        } else {
          result = await prisma.featureItem.create({
            data: { title, description, iconName, order: parseInt(order) || 0 },
          });
        }
        break;
      }
      case 'deleteFeature': {
        const { id } = payload;
        result = await prisma.featureItem.delete({ where: { id } });
        break;
      }

      // ─── PROCESS STEPS ──────────────────────────────────────────
      case 'upsertProcess': {
        const { id, stepNumber, title, description } = payload;
        const sNum = parseInt(stepNumber);
        if (id) {
          result = await prisma.processStep.update({
            where: { id },
            data: { stepNumber: sNum, title, description },
          });
        } else {
          result = await prisma.processStep.create({
            data: { stepNumber: sNum, title, description },
          });
        }
        break;
      }
      case 'deleteProcess': {
        const { id } = payload;
        result = await prisma.processStep.delete({ where: { id } });
        break;
      }

      // ─── STATS ──────────────────────────────────────────────────
      case 'upsertStat': {
        const { id, number, label, icon } = payload;
        if (id) {
          result = await prisma.statItem.update({
            where: { id },
            data: { number, label, icon: icon || 'Star' },
          });
        } else {
          result = await prisma.statItem.create({
            data: { number, label, icon: icon || 'Star' },
          });
        }
        break;
      }
      case 'deleteStat': {
        const { id } = payload;
        result = await prisma.statItem.delete({ where: { id } });
        break;
      }

      // ─── TESTIMONIALS ───────────────────────────────────────────
      case 'upsertTestimonial': {
        const { id, clientName, feedback, role, rating, avatarUrl } = payload;
        if (id) {
          result = await prisma.testimonialItem.update({
            where: { id },
            data: { clientName, feedback, role, rating: parseInt(rating) || 5, avatarUrl },
          });
        } else {
          result = await prisma.testimonialItem.create({
            data: { clientName, feedback, role, rating: parseInt(rating) || 5, avatarUrl },
          });
        }
        break;
      }
      case 'deleteTestimonial': {
        const { id } = payload;
        result = await prisma.testimonialItem.delete({ where: { id } });
        break;
      }

      // ─── FAQS ───────────────────────────────────────────────────
      case 'upsertFAQ': {
        const { id, question, answer, iconName, order } = payload;
        if (id) {
          result = await prisma.fAQItem.update({
            where: { id },
            data: { question, answer, iconName, order: parseInt(order) || 0 },
          });
        } else {
          result = await prisma.fAQItem.create({
            data: { question, answer, iconName, order: parseInt(order) || 0 },
          });
        }
        break;
      }
      case 'deleteFAQ': {
        const { id } = payload;
        result = await prisma.fAQItem.delete({ where: { id } });
        break;
      }

      default:
        return NextResponse.json({ error: `Unsupported action: ${action}` }, { status: 400 });
    }

    // ─── REVALIDATION (Next.js ISR Cache Purging) ──────────────────
    // This invalidates the cached homepage statically built on server
    // and causes the Next.js server to regenerate the homepage with new database content
    revalidatePath('/');

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error modifying admin content:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
