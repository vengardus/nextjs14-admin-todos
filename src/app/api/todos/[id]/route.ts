import { IResponseTodo, initResponse } from "@/interface/response.interface";
import prisma from "@/lib/prisma";
import { Prisma, Todo } from "@prisma/client";

interface ISegments {
    params: {
        id: string;
    };
}

export async function GET(request: Request, segments: ISegments) {
    const { id } = segments.params;
    const data = initResponse() as IResponseTodo;

    try {
        const todo = await prisma.todo.findFirst({
            where: {
                id: id,
            },
        });
        data.data = todo;
        data.success = true;
        data.status = todo ? 200 : 404;
        data.message = todo ? "" : "Not found";
    } catch (error) {
        error instanceof Prisma.PrismaClientKnownRequestError
            ? (data.message = error.message)
            : (data.message = "Ocurrió un error!!!");
    }

    return Response.json({ data }, { status: data.status });
}
