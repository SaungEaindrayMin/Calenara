import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import prisma from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google],
  callbacks: {
    async signIn({ user }) {
      // If this is a new user, assign them the free plan
      if (user.id) {
        const existingUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { planId: true }
        });

        if (!existingUser?.planId) {
          // Find the free plan
          const freePlan = await prisma.plan.findFirst({
            where: { type: "FREE" }
          });

          if (freePlan) {
            // Assign the free plan to the user
            await prisma.user.update({
              where: { id: user.id },
              data: { planId: freePlan.id }
            });
          }
        }
      }
      return true;
    },
  },
});