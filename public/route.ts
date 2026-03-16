import { NextResponse } from 'next/server';
import db from '@/public/db.json';

export async function GET() {
  try {
    if (!db) {
      throw new Error('Cannot load data');
    }

    return NextResponse.json(db.courses);
  } catch (error) {
    console.error("Error reading db.json:", error);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}