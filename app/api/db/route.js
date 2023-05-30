// @ts-ignore
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(req) {
    const data = await prisma.aiquery.findMany()
    return NextResponse.json(data)
}

export async function POST(req) {
  const body = await req.json()
  const data = await prisma.aiquery.create({
    data: {
      ...body
    }
  })
  return NextResponse.json(data)
}

export async function DELETE(req) {
  const body = await req.json()
  const data = await prisma.aiquery.delete({
    where: {
      id: body.id
    }
  })
  return NextResponse.json(data)
}