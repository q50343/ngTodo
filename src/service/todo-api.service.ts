import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from 'src/@models/todo.models';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  private url = '/api/todo2_16'

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<Todo[]>(this.url)
  }
  add(item: Todo) {
    return this.http.post<Todo>('/api/todo2_16',item)
  }
  update(item: Todo) {
    return this.http.put('/api/todo2_16/' + item.TodoId,item)
  }
  delete(item: Todo) {
    return this.http.delete('/api/todo2_16/' + item.TodoId)
  }
  toggleAll(bool: boolean) {
    return this.http.put('/api/todo2_16/Status' + bool, null)
  }
  clearCompleted() {
    return this.http.delete('/api/todo2_16/clearCompleted')
  }
}


