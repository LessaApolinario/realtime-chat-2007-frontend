import type { CreateChatRoomRequest } from "@/@types/http/request/auth";
import { ChatPermission, ChatRoomType } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const requestBody: CreateChatRoomRequest = await request.json();

    if (!requestBody.name || !requestBody.permission || !requestBody.type) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 },
      );
    }

    const chatRoom = await prisma.chatRoom.create({
      data: {
        user_id: token.sub ?? "",
        name: requestBody.name ?? "",
        permission: requestBody.permission ?? ChatPermission.all,
        type: requestBody.type ?? ChatRoomType.public,
      },
    });

    return NextResponse.json({ chatRoom }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
