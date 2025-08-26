import type { CreateChatRoomRequest } from "@/@types/http/request/auth";
import type { CreateChatRoomResponse } from "@/@types/http/response/auth";
import jwt from "jsonwebtoken";
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

    const signedToken = jwt.sign(
      { name: token.name, email: token.email },
      process.env.NEXTAUTH_SECRET!,
      { expiresIn: "1h" },
    );

    const requestBody: CreateChatRoomRequest = await request.json();

    if (!requestBody.name || !requestBody.permission || !requestBody.type) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 },
      );
    }

    const response = await fetch(
      `${process.env.REALTIME_CHAT_API_URL}/api/chat-room/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${signedToken}`,
        },
        body: JSON.stringify({
          user_id: token.sub,
          name: requestBody.name,
          permission: requestBody.permission,
          type: requestBody.type,
          password: requestBody.password,
        }),
      },
    );

    const result: CreateChatRoomResponse = await response.json();
    return NextResponse.json(
      { chatRoom: result.chatRoom, error: result.error },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
