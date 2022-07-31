import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { TodosProvider } from "./context/TodosContext";

function App() {
  return (
    <div className="App">
      <div className="container">
        <TodosProvider>
          <Header />
          <TodoForm />
          <TodoList />
        </TodosProvider>
      </div>
    </div>
  );
}

export default App;
