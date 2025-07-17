import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const planType = searchParams.get('type')?.toUpperCase();

  if (!planType || !['FREE', 'PRO', 'PLUS'].includes(planType)) {
    return NextResponse.json({ error: 'Invalid plan type' }, { status: 400 });
  }

  try {
    const plan = await prisma.plan.findFirst({
      where: {
        type: planType as any,
      },
    });

    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    return NextResponse.json({ plan });
  } catch (error) {
    console.error('Error fetching plan:', error);
    return NextResponse.json({ error: 'Failed to fetch plan' }, { status: 500 });
  }
}