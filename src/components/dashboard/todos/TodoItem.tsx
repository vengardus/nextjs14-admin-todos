"use client"
import { Todo } from "@prisma/client"
import styles from "./TodoItem.module.css"


interface Props {
  todo: Todo,
  toggleTodo: (id: string, complete: boolean) => Promise<Todo>
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
 
  return (
    <div
      className={todo.complete ? styles.todoDone : styles.todoPending}
      onClick={() => toggleTodo(todo.id, !todo.complete)}
    >
      {todo.description}
    </div>
  )
}
