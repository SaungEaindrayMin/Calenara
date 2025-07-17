import { auth } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Redirect to the checkout page instead of directly updating the plan
export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const searchParams = request.nextUrl.searchParams;
  const planType = searchParams.get('plan')?.toLowerCase();

  if (!planType || !['pro', 'plus'].includes(planType)) {
    return NextResponse.redirect(new URL('/pricing', request.url));
  }

  // Redirect to the checkout page with the selected plan
  return NextResponse.redirect(new URL(`/checkout?plan=${planType}`, request.url));
}