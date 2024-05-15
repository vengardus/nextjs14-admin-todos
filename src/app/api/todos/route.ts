import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import * as yup from "yup";
import { IResponseTodos, initResponse } from "@/interface/response.interface";

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
        //return Response.json({ data: data }, { status: data.status });
        return Response.json(data);
    }

    try {
        const todos = await prisma.todo.findMany({
            take: take,
            skip: skip,
        });
        data.data = todos;
        data.success = true;
        data.status = todos.length ? 200 : 200; // ojo: 204 no debe devolver un body (ocurre error)
        data.message = todos.length ? "" : "No hay registros";
    } catch (error) {
        error instanceof Prisma.PrismaClientKnownRequestError
            ? (data.message = error.message)
            : (data.message = "Ocurrió un error!!!");
    }

    return Response.json(data);
}

const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
    const data = initResponse();
    try {
        //const body = await postSchema.validate(await request.json());
        // ojo: de esta manera ignora algun campo que no pertenezca al modelo
        const { description, complete } = await postSchema.validate(
            await request.json()
        );
        const todo = await prisma.todo.create({
            data: { description, complete },
        });
        data.data = todo;
        data.success = true;
        data.status = 201;
    } catch (error) {
        data.message = ((error as any).message ??
            "Ocurrió un error!!!") as string;
        data.status = 400;
    }

    return Response.json(data);
}

export async function DELETE(request: Request) {
    const data = initResponse()
    try {
        
        const {count} = await prisma.todo.deleteMany({ where: { complete: true } });
        data.data = count
        data.status = 200
        data.success = true
    } catch (error) {
        data.message = ((error as any).message ??
            "Ocurrió un error!!!") as string;
        data.status = 400;
    }

    return Response.json(data)
}
