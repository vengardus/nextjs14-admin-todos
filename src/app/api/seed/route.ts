import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs'


export async function GET(request: Request) {
    await prisma.todo.deleteMany(); // delete all
    await prisma.user.deleteMany(); // delete all

    await prisma.user.create({
        data: {
            email: "test1@google.com",
            password:  bcrypt.hashSync("1234"),
            roles: ["user", "admin", "super"],
            todos: {
                create: [
                    { description: "Ordenar lavandería" },
                    { description: "Ordenar cuarto", complete: true },
                    { description: "Ordenar medicinas" },
                    { description: "Ordenar cuentas" },
                    { description: "Hacer presupuesto remodelación del baño" },
                ],
            },
        },
    });

    return new Response(
        JSON.stringify({
            message: "Get Seed",
        }),
        { status: 200 }
    );
}
