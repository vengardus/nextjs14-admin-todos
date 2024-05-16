"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const actionToggleTodo = async (
    id: string,
    complete: boolean
): Promise<Todo> => {
    const todo = await prisma.todo.findFirst({ where: { id } });
    if (!todo) throw `No se encontró Todo con id=${id}`;

    const todoUpdate = await prisma.todo.update({
        data: { complete },
        where: { id },
    });
    
    revalidatePath('/dashboard/server-todos')

    return todoUpdate;
};

export const actionInsertTodo = async(description:string) => {
    try {
        const todo = await prisma.todo.create({data:{description}})

        revalidatePath('dashboard/server-todos')
        return todo
    } catch (error) {
        return { message: 'Error al insertar'}
    }
}

export const actionDeleteAllTodo = async():Promise<number> => {
    try {
        const {count} = await prisma.todo.deleteMany({where:{complete:true}})

        revalidatePath('dashboard/server-todos')
        return count
    } catch(error) {
        return 0
    }
}