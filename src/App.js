import React, { useRef, useEffect, useState, createContext } from "react";
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
  const [inputState, setInputState] = useState("");
  const [filterState, setfilterState] = React.useState("all");
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
  }, [filterState]);

  function changeInput(event) {
    setInputState(event.target.value);
  }

  async function addTodo() {
    if (inputState !== "") {
      setTodoListState(await addTodoApi(inputState));
    }
    setInputState("");
  }

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
        <div className="AddTodo">
          <input value={inputState} onChange={changeInput} />
          <button id="AddButton" onClick={addTodo}>
            Add Todo
          </button>
        </div>
        <TodoList />
      </div>
    </AppContext.Provider>
  );
}

export default App;
