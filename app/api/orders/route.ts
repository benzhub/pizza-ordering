import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { orderSchema } from "../../validationSchema";
import { getServerSession, Session } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { Status } from "@prisma/client";

interface ModifiedSession extends Session {
  user: Session["user"] & {
    id: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const body = await request.json();
    const validation = orderSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const { cartItems, customerName, customerPhone, customerAddress } =
      validation.data;

    const typedSession = session as ModifiedSession;

    const newOrder = await prisma.order.create({
      data: {
        assignedToUserId: typedSession.user?.id,
        customerName,
        customerPhone,
        customerAddress,
        status: Status.OPEN,
        assignedOrderItem: {
          create: cartItems.map(({ productId, unitPrice, quantity }) => ({
            unitPrice,
            quantity,
            assignedToProduct: { connect: { id: productId } },
          })),
        },
      },
      include: {
        assignedOrderItem: true,
      },
    });

    return NextResponse.json({
      message: "Order created successfully",
      newOrder,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const typedSession = session as ModifiedSession;
    const orders = await prisma.order.findMany({
      where: { assignedToUserId: typedSession.user.id },
      include: { assignedOrderItem: true },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
