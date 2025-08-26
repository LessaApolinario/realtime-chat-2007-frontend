import { comparePasswordWithHash } from "@/core/utils/hash";
import { prisma } from "@/lib/prisma";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email e senha são obrigatórios.");
          }

          const foundUser = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!foundUser) {
            throw new Error("Usuário não encontrado.");
          }

          const doPasswordsMatch = await comparePasswordWithHash(
            credentials.password,
            foundUser.password_hash,
          );

          if (!doPasswordsMatch) {
            throw new Error("A senha está incorreta.");
          }

          return {
            id: foundUser.id,
            name: foundUser.username,
            email: foundUser.email,
          };
        } catch (error) {
          throw new Error((error as any).message || "Falha na autenticação.");
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 1, // One day
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
        };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
