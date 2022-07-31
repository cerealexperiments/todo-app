import React, { useContext } from "react";
import styles from "./TodoList.module.css";
import TodoItem from "./TodoItem";
import TodosContext from "../context/TodosContext";

function TodoList() {
  const { todos, deleteTodo } = useContext(TodosContext);
  return (
    <div className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
      ))}
    </div>
  );
}

export default TodoList;
