import { IResponseTodos, initResponse } from "@/interface/response.interface";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const validateGet = ({
    take,
    skip,
}: {
    take: number;
    skip: number;
}): string | null => {
    let messageError = null;
    if (isNaN(take)) messageError = "Take debe ser un número";
    else if (isNaN(skip)) messageError = "Skip debe ser un número";

    return messageError;
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const take = Number(searchParams.get("take") ?? "10");
    const skip = Number(searchParams.get("skip") ?? "0");
    const data = initResponse() as IResponseTodos;

    const messageError = validateGet({ take, skip });
    if (messageError) {
        data.message = messageError;
        data.status = 400;
        return Response.json({ data: data }, { status: data.status });
    }

    try {
        const todos = await prisma.todo.findMany({
            take: take,
            skip: skip,
        });
        data.data = todos
        data.success = true
        data.status = 200
        data.message = todos.length? '' : 'No hay registros'
    } catch (error) {
        error instanceof Prisma.PrismaClientKnownRequestError
            ? (data.message = error.message)
            : (data.message = "Ocurrió un error!!!");
    }

    return Response.json({ data: data }, { status: data.status });
}
