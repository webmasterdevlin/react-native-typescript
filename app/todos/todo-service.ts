import {ITodoModel} from './todo-model';
import axios from 'axios';
import {BaseUrl} from '../api-config';

export async function getTodos() {
  return await axios.get(BaseUrl.todos);
}

export async function deleteTodo(id: string) {
  return await axios.delete(`${BaseUrl.todos}${id}`);
}

export async function postTodo(newTodo: ITodoModel) {
  return await axios.post(BaseUrl.todos, newTodo);
}

export async function putTodo(updateTodo: ITodoModel) {
  return await axios.put(`${BaseUrl.todos}${updateTodo.id}`, updateTodo);
}
