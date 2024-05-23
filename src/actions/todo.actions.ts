"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Todo } from "@prisma/client";
import { actionGetSessionServer } from "./auth.actions";
import { IActionsCrud } from "@/interface/actions.interface";

const sleep = (seconds: number = 0) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, seconds * 1000);
    });
};

export const actionToggleTodo = async (
    id: string,
    complete: boolean
): Promise<Todo> => {
    // para pruebas del Optimistic
    //await sleep(3)

    const todo = await prisma.todo.findFirst({ where: { id } });
    if (!todo) throw `No se encontró Todo con id=${id}`;

    const todoUpdate = await prisma.todo.update({
        data: { complete },
        where: { id },
    });

    revalidatePath("/dashboard/server-todos");

    return todoUpdate;
};

export const actionInsertTodo = async (
    description: string
): Promise<IActionsCrud> => {
    const resp: IActionsCrud = {
        data: null,
        success: false,
        message: "",
    };

    try {
        const session = await actionGetSessionServer();
        if (!(session && session.user && !!session.user.id))
            resp.message = "no-session";
        else {
            const newTodo = await prisma.todo.create({
                data: {
                    description,
                    userId: session.user.id,
                },
            });
            resp.data = newTodo;
            resp.success = true;
        }
        revalidatePath("dashboard/server-todos");
    } catch (error) {
        resp.message = `${error}`;
    }

    return resp;
};

export const actionDeleteAllTodo = async (): Promise<IActionsCrud> => {
    const resp:IActionsCrud = {
        data: null,
        success:false,
        message:''
    }
    
    try {
        const session = await actionGetSessionServer();
        if (!(session && session.user && !!session.user.id)) 
            resp.message = 'no-session'
        else {
            console.log('ID!!:', session.user.id)
            const { count } = await prisma.todo.deleteMany({
                where: { 
                    userId: session.user.id,
                    complete: true 
                },
            });
            resp.data = count
            resp.success = true
    
            revalidatePath("dashboard/server-todos");
        }
    } catch (error) {
        resp.message = `${error}`;
    }

    return resp
};
