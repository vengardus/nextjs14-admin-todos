"use client"
import { FormEvent, startTransition, useOptimistic, useState } from "react"
import { Todo } from "@prisma/client"
import styles from "./TodoItem.module.css"
import { actionToggleTodo } from "@/actions/todo.actions"


interface Props {
  todo: Todo,
  toggleTodo: (id: string, complete: boolean) => Promise<Todo>
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  const [isToggleEnabled, setIsTogleEnabled] = useState(true)
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({ ...state, complete: newCompleteValue })
  )

  const onToggleTodo = async () => {
    if ( !isToggleEnabled) return
    setIsTogleEnabled(false)
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete))
      await actionToggleTodo(todoOptimistic.id, !todoOptimistic.complete)
    } catch (error) {
      toggleTodoOptimistic(!todoOptimistic.complete)
    }
    setIsTogleEnabled(true)
  }

  return (
    <div
      className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}
      //onClick={() => toggleTodo(todoOptimistic.id, !todoOptimistic.complete)}
      onClick={onToggleTodo}
    >
      {todoOptimistic.description}
    </div>
  )
}
