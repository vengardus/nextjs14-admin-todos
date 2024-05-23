export const dynamic = 'force-dinamyc'
export const revalidate = 0

import prisma from "@/lib/prisma";
import { TodosTemplate } from "@/components/dashboard/todos/TodosTemplate";
import { Metadata } from "next";
import { NewTodo } from "@/components/dashboard/todos/NewTodo";
import { actionGetSessionServer } from "@/actions/auth.actions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Lista de Todos',
  description: ''
}

export default async function RestTodosPage() {
  const session = await actionGetSessionServer()
  if (!session)
    redirect('/api/auth/signin')

  const todos = await prisma.todo.findMany(
    {
      where: { userId: session.user?.id?? '' },
      orderBy: { description: 'asc' }
    }
  )

  console.log('construido rest-todo', session.user, todos)

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full pl-7">
        <NewTodo />
      </div>
      <TodosTemplate todos={todos} />
    </div>
  )
}
