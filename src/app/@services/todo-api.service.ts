import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../@models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  private url = '/api/todo2_16';

  constructor(private http: HttpClient) { }

  取得資料() {
    return this.http.get<Todo[]>(this.url);
  }

  新增(value: Todo) {
    return this.http.post<Todo>(this.url, value);
  }

  修改(value: Todo) {
    return this.http.put(`${this.url}/${value.TodoId}`, value);
  }

  刪除(value: Todo) {
    return this.http.delete(`${this.url}/${value.TodoId}`);
  }

  全部狀態統一(value: boolean) {
    return this.http.put(`${this.url}/Status/${value}`, null);
  }

  刪除已完成事項() {
    return this.http.delete(`${this.url}/clearCompleted`);
  }

}
