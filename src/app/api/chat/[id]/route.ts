import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const roomId = params.id;
    const chatRoom = await prisma.chatRoom.findUnique({
      where: { id: roomId },
    });
    return NextResponse.json({ chatRoom }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
