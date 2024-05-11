import { Todo } from "@prisma/client";

interface IResponseBase {
    data: any | null;
    success: boolean;
    message: string;
    status: number;
}

export interface IResponseTodos extends IResponseBase{
    data: Todo[] | null;
}

export interface IResponseTodo extends IResponseBase{
    data: Todo | null;
}


export const initResponse = (): IResponseBase => {
    return {
        data: null,
        success: false,
        message: "",
        status: 500,
    };
};
