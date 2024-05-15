import prisma from "@/lib/prisma";
import { Prisma, Todo } from "@prisma/client";
import * as yup from "yup";
import { IResponseTodo, initResponse } from "@/interface/response.interface";

interface ISegments {
    params: { id: string };
}

const getTodo = async (id: string): Promise<Todo | null> => {
    const todo = await prisma.todo.findFirst({
        where: { id: id },
    });
    return todo;
};

export async function GET(request: Request, segments: ISegments) {
    const { id } = segments.params;
    const data = initResponse() as IResponseTodo;

    try {
        const todo = await getTodo(id)
        data.data = todo;
        data.success = true;
        data.status = todo ? 200 : 404;
        data.message = todo ? "" : "Not found";
    } catch (error) {
        error instanceof Prisma.PrismaClientKnownRequestError
            ? (data.message = error.message)
            : (data.message = "Ocurrió un error!!!");
    }

    //return Response.json({ data }, { status: data.status });
    return Response.json(data);
}

const putSchema = yup.object({
    description: yup.string().optional(),
    complete: yup.boolean().optional(),
});

export async function PUT(request: Request, segments: ISegments) {
    const { id } = segments.params;
    const data = initResponse() as IResponseTodo;
    let isFound = false;

    try {
        const todo = await getTodo(id)
        isFound = todo? true: false;
        if (!isFound) {
            data.status = 404;
            data.message = "Not found";
        }
    } catch (error) {
        error instanceof Prisma.PrismaClientKnownRequestError
            ? (data.message = error.message)
            : (data.message = "Ocurrió un error!!!");
    }

    if (isFound) {
        try {
            const { description, complete } = await putSchema.validate(
                await request.json()
            );
            const todoUpdated = await prisma.todo.update({
                where: { id: id },
                data: { description, complete },
            });
            data.data = todoUpdated;
            data.status = 200;
            data.success = true;
        } catch (error) {
            data.message = ((error as any).message ??
                "Ocurrió un error!!!") as string;
            data.status = 400;
        }
    }

    //return Response.json({ data }, { status: data.status });
    return Response.json(data);
}
