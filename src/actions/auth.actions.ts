"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";

export const actionGetSessionServer = async () => {
    const session = await auth();

    return session;
};

export const actionSignInCredentials = async (
    email: string,
    password: string
) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        const dbuser = createUser(email, password);
        return dbuser;
    }

    if (!bcrypt.compareSync(password, user?.password ?? "")) return null;

    return user;
};

// -----
const createUser = async (email: string, passowrd: string) => {
    let user = null;

    try {
        user = await prisma.user.create({
            data: {
                email,
                name: email.split("@")[0],
                password: bcrypt.hashSync(passowrd),
            },
        });
    } catch (error) {}

    return user;
};
