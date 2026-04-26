import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoItem } from '../../interfaces/todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5259/api';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(`${this.apiUrl}/TodoList`);
  }

  getTodoById(id: number) {
  return this.http.get<TodoItem>(`${this.apiUrl}/TodoList/${id}`);
  }
  

createTodo(todo: TodoItem) {
  return this.http.post<TodoItem>(`${this.apiUrl}/TodoList`, todo);
}

updateTodo(id: number, todo: TodoItem) {
  return this.http.put<void>(`${this.apiUrl}/TodoList/${id}`, todo);
}

deleteTodo(id: number) {
  return this.http.delete<void>(`${this.apiUrl}/TodoList/${id}`);
}

}

