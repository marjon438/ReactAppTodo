import { uuidv4 } from "uuid";

class Todo {
  constructor(name) {
    this.name = name;
    this.id = uuidv4();
    this.done = false;
  }
}

let test = new Todo("test");

console.log(test.id);
