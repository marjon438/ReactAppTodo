import Axios from "axios";

const homepage = "https://todoapp-api.apps.k8s.gu.se/todos";
const key = "?key=b402de1c-4de9-4c0a-8b7c-d156aff86502";

export async function GetTodoApi() {
  const answer = await Axios.get(homepage + key);
  return answer.data;
}

export function getFilteredTodos(todoList, filterState) {
  if (filterState === "all") {
    return todoList;
  } else if (filterState === "done") {
    return todoList.filter((item) => item.done === true);
  } else if (filterState === "undone") {
    return todoList.filter((item) => item.done === false);
  }
}

export async function addTodoApi(title) {
  const option = { "Content-Type": "application/json", title: title };
  const answer = await Axios.post(homepage + key, option);
  return answer.data;
}
export async function deleteTodoApi(id) {
  const answer = await Axios.delete(homepage + "/" + id + key);
  return answer.data;
}
export async function editTodoApi(todo) {
  const option = {
    "Content-Type": "application/json",
    title: todo.title,
    done: todo.done,
  };
  const answer = await Axios.put(homepage + "/" + todo.id + key, option);
  return answer.data;
}
