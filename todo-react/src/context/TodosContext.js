import { createContext, useState, useEffect } from "react";
import axios from "axios";

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/todos").then((response) => {
      console.log(response.data);
      const diff = todos.filter((item) => item.id === undefined);
      console.log(diff);
      if (diff.length >= 1 || todos.length === 0) {
        setTodos(response.data);
      }
    });
  }, [todos]);

  const addTodo = (todo) => {
    if (todo.title.length <= 5) {
      alert("Content should at least be 6 characters long");
    } else {
      axios
        .post("http://localhost:3001/api/todos", {
          ...todo,
        })
        .then(() => {
          console.log("added");
        });
      setTodos(todos.concat(todo));
    }
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3001/api/todos/${id}`).then(() => {
      console.log("todo deleted");
      setTodos(todos.filter((item) => item.id !== id));
    });
  };

  return (
    <TodosContext.Provider
      value={{
        todos: todos,
        setTodos: setTodos,
        addTodo: addTodo,
        deleteTodo: deleteTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
