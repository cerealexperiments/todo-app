import React, { useState, useContext } from "react";
import styles from "./TodoForm.module.css";
import TodosContext from "../context/TodosContext";

function TodoForm() {
  const { addTodo } = useContext(TodosContext);
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTodo({
          title: text,
        });
      }}
      className={styles.form}
    >
      <input
        value={text}
        onChange={handleChange}
        type="text"
        placeholder="your todo..."
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Add
      </button>
    </form>
  );
}

export default TodoForm;
