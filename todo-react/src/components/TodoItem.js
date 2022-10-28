import React, { useContext } from "react";
import styles from "./TodoItem.module.css";
import { BsFillTrashFill } from "react-icons/bs";
import TodosContext from "../context/TodosContext";

function TodoItem({ todo }) {
  const { deleteTodo } = useContext(TodosContext);
  return (
    <div className={styles.todoItem}>
      <p className={styles.todoTitle}>{todo.title}</p>
      <BsFillTrashFill
        className={styles.deleteIcon}
        onClick={() => deleteTodo(todo.id)}
      />
    </div>
  );
}

export default TodoItem;
