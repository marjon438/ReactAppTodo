import { useRef, useEffect, useState, createContext } from "react";
import { AddTodo } from "./AddTodo";
import { GetTodoApi, getFilteredTodos, addTodoApi } from "./apiFunctions";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Dropdown } from "./Dropdown";
import { TodoTile } from "./Todotile.js";
/*
npx create-react-app my-app
cd my-app
npm start
*/

export const AppContext = createContext({});

function App() {
  const [todoListState, setTodoListState] = useState([]);

  const [filterState, setfilterState] = useState("all");
  const firstMount = useRef(true);

  useEffect(() => {
    async function getInitTodos() {
      setTodoListState(await GetTodoApi());
    }
    if (firstMount.current === true) {
      console.log("mounted");
      getInitTodos();
      firstMount.current = false;
    }
  }, []);

  function TodoList() {
    return (
      <div className="TodoList">
        {getFilteredTodos(todoListState, filterState).map((todo) => {
          return <TodoTile key={todo.id} todo={todo} />;
        })}
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{ filterState, setTodoListState, setfilterState }}
    >
      <div className="App">
        <Dropdown />
        <AddTodo />
        <TodoList />
      </div>
    </AppContext.Provider>
  );
}

export default App;
