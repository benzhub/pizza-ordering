import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import { productSchema } from "@/app/validationSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany({});
  return NextResponse.json(products, { status: 200 });
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
