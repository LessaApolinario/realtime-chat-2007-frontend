import type { FetchChartRoomsResponse } from "@/@types/http/response/auth";
import jwt from "jsonwebtoken";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
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

    const response = await fetch(
      `${process.env.REALTIME_CHAT_API_URL}/api/chat-rooms`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${signedToken}`,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData },
        { status: response.status },
      );
    }

    const data: FetchChartRoomsResponse = await response.json();

    console.log({ data, status: response.status });

    return NextResponse.json({ chatRooms: data.chatRooms }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
