"use client"
import { useRouter } from "next/navigation"
import { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem"
//import * as apiTodos from "@/actions-api/todos.actions"
import { actionToggleTodo } from "@/actions/todo.actions"


interface Props {
  todos?: Todo[]
}

export const TodosTemplate = ({ todos = [] }: Props) => {
  const router = useRouter()

  // Esto era para restApi
  // const toggleTodo = async (id:string, complete:boolean):Promise<void> => {
  //   await apiTodos.updateTodo(id, complete)
  //   router.refresh()
  // }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {
        todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={actionToggleTodo}/>
        ))
      }
    </div>
  )
}
