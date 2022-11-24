import { useContext, useState } from "react";
import { AppContext } from "./App";
import {
  MdSave,
  MdOutlineDeleteOutline,
  MdModeEditOutline,
} from "react-icons/md";
import { editTodoApi, deleteTodoApi } from "./apiFunctions";

export function TodoTile({ todo }) {
  const { setTodoListState } = useContext(AppContext);
  const [doneState, setDoneState] = useState(todo.done);
  const [inputState, setInputState] = useState(todo.title);
  const [editState, setEditState] = useState(false);

  function changeInput(event) {
    setInputState(event.target.value);
  }
  async function deleteTodo(id) {
    setTodoListState(await deleteTodoApi(id));
  }

  async function editTodo(todo) {
    setTodoListState(await editTodoApi(todo));
  }

  function toggleDoneTodo(todo) {
    todo.done = !todo.done;
    setDoneState(todo.done);
    editTodo(todo);
  }
  function saveEdit() {
    todo.title = inputState;
    editTodo(todo);
    setEditState(false);
  }

  return (
    <div className="Todo">
      <input
        className="Checkbox"
        checked={doneState}
        type="checkbox"
        onChange={() => toggleDoneTodo(todo)}
      ></input>
      {editState ? (
        <input
          className="editInput"
          defaultValue="My default value"
          value={inputState}
          onChange={changeInput}
        />
      ) : (
        <p className={doneState ? "LineThrough" : undefined}>{todo.title}</p>
      )}
      {editState ? (
        <button onClick={saveEdit}>
          {" "}
          <MdSave size={20} className="save" />{" "}
        </button>
      ) : (
        <button onClick={() => setEditState(true)}>
          {" "}
          <MdModeEditOutline size={20} className="edit" />{" "}
        </button>
      )}

      <button onClick={() => deleteTodo(todo.id)}>
        {" "}
        <MdOutlineDeleteOutline size={20} className="delete" />{" "}
      </button>
    </div>
  );
}
