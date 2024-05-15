import prisma from "@/lib/prisma";
import { TodosTemplate } from "@/components/dashboard/todos/TodosTemplate";
import { Metadata } from "next";
import { NewTodo } from "@/components/dashboard/todos/NewTodo";

export const metadata: Metadata = {
  title: 'Lista de Todos',
  description: ''
}

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } })

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full pl-7">
        <NewTodo />
      </div>
      <TodosTemplate todos={todos} />
    </div>
  )
}
