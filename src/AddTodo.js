import { useContext, useState } from "react";
import { addTodoApi } from "./apiFunctions";
import { AppContext } from "./App";

export function AddTodo() {
  const [inputState, setInputState] = useState("");

  const { setTodoListState } = useContext(AppContext);

  function changeInput(event) {
    setInputState(event.target.value);
  }

  async function addTodo() {
    if (inputState !== "") {
      setTodoListState(await addTodoApi(inputState));
    }
    setInputState("");
  }

  return (
    <div className="AddTodo">
      <input value={inputState} onChange={changeInput} />
      <button id="AddButton" onClick={addTodo}>
        Add Todo
      </button>
    </div>
  );
}
