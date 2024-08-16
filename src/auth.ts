import NextAuth, { DefaultSession } from "next-auth"
import Discord from "next-auth/providers/discord"
import { db } from "./lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole
    } & DefaultSession["user"]
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Discord],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session }) => {
      return {
        ...session,
        user: {
          ...session.user,
          role: session.user.role,
        },
      }
    },
  },
})
