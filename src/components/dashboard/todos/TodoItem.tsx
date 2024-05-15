"use client"
import { Todo } from "@prisma/client"
import styles from "./TodoItem.module.css"


interface Props {
  todo: Todo,
  toggleTodo: (id: string, complete: boolean) => Promise<void>
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
 
  return (
    <div
      className={todo.complete ? styles.todoDone : styles.todoPending}
      onClick={() => toggleTodo(todo.id, !todo.complete)}
    >
      TodosItem: {todo.id} - {todo.description}
    </div>
  )
}
