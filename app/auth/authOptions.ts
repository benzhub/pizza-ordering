import Auth0Provider from "next-auth/providers/auth0";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../prisma/client";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      idToken: true,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

export default authOptions;