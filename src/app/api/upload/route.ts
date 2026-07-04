import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, '-');
    const filename = `${timestamp}-${originalName}`;
    
    // Ensure upload directory exists
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'cvs');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // Directory might already exist, ignore error
    }

    // Save the file
    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Return the public URL
    const fileUrl = `/uploads/cvs/${filename}`;

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
