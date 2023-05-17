import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(req: Request) {
  // get the data from the database using prisma
    const data = await prisma.aiquery.findMany()
    return data
}