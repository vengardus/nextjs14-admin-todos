"use client"
import { useRouter } from "next/navigation"
import { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem"
import * as apiTodos from "@/actions/todos.actions"


interface Props {
  todos?: Todo[]
}

export const TodosTemplate = ({ todos = [] }: Props) => {
  const router = useRouter()

  const toggleTodo = async (id:string, complete:boolean):Promise<void> => {
    await apiTodos.updateTodo(id, complete)
    router.refresh()
  }

  return (
    <>
      {
        todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo}/>
        ))
      }
    </>
  )
}
