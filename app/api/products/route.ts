import authOptions from "@/app/auth/authOptions";
import { productSchema } from "@/app/validationSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import PAGESIZE from "@/utils/pageSize";

export async function GET(request: NextRequest) {
  const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
  const products = await prisma.product.findMany({
    skip: (page - 1) * PAGESIZE,
    take: PAGESIZE,
  });
  const totalCount = await prisma.product.count();
  return NextResponse.json({products, totalCount}, { status: 200 });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = productSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newProduct = await prisma.product.create({
    data: {
      title: body.title,
      description: body.description,
      price: body.price,
      thumb: body.thumb,
    },
  });

  return NextResponse.json(newProduct, { status: 201 });
}
