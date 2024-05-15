import { IResponseTodo } from "@/interface/response.interface";
import { Todo } from "@prisma/client";

export const updateTodo = async (
    id: string,
    complete: boolean
): Promise<Todo | null> => {
    const body = { complete };
    const res = (await fetch(`/api/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json())) as IResponseTodo;

    return res.data;
};

export const createTodo = async (description: string): Promise<Todo | null> => {
    const body = { description };
    const res = (await fetch(`/api/todos`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json())) as IResponseTodo;

    return res.data;
};

export const deleteManyTodo = async (): Promise<Todo | number | null> => {
    const res = (await fetch("/api/todos", {
        method: "DELETE",
    }).then((res) => res.json())) as IResponseTodo;

    return res.data;
};
