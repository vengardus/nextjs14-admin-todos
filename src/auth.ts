import NextAuth, { CredentialsSignin } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { actionSignInCredentials } from "./actions/auth.actions";

const prisma = new PrismaClient();

class InvalidLoginError extends CredentialsSignin {
    code = "Invalid identifier or password";
}

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),

    session: {
        strategy: "jwt",
    },

    providers: [
        Google,
        GitHub,
        CredentialsProvider({
            credentials: {
                email: {
                    label: "Correo electrónico",
                    type: "email",
                    placeholder: "usuario@gmail.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "*******",
                },
            },
            async authorize(credentials) {
                try {
                    const user = await actionSignInCredentials(
                        credentials.email as string,
                        credentials.password as string
                    );
                    return user;
                } catch (error) {
                    throw Error("Usuario o passowrd incorrecto");
                }
            },
        }),
    ],

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log(user);
            return true;
        },

        async jwt({ token, user, account, profile }) {
            const dbUser = await prisma.user.findUnique({
                where: { email: token.email ?? "no-email" },
            });
            token.id = dbUser?.id;
            token.roles = dbUser?.roles;
            token.isActive = dbUser?.isActive;
            return token;
        },

        async session({ session, token, user }) {
            if (session && session.user) {
                session.user.id = token.id;
                session.user.roles = token.roles;
                session.user.isActive = token.isActive;
            }
            return session;
        },
    },
});
