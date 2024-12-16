import authOptions from "@/app/auth/authOptions";
import { patchUserSchema } from "@/app/validationSchema";
import { Session, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";

interface ModifiedSession extends Session {
  user: Session["user"] & {
    id: string;
  };
}

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = patchUserSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { name, phone, address } = body;

  const typedSession = session as ModifiedSession;

  const user = await prisma.user.findUnique({
    where: { id: typedSession.user?.id },
  });
  if (!user) {
    return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name,
      phone,
      address,
    },
  });
  return NextResponse.json(updatedUser);
}
