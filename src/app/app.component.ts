import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo, TodoStatusType } from '../@models/todo.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'OneTodo';
  placeholder = 'What needs to be done????';
  toggleAllBtn = false;
  nowTodoStatusType = TodoStatusType.All;
  TodoStatusType = TodoStatusType;
  todoInputModel = '';
  todoDataList: Todo[] = [];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getDate()
  }
  getDate() {
    this.http.get<Todo[]>('/api/todo2_16').subscribe(x => {
      this.todoDataList = x
    })
  }
  toggleAll() {
    this.toggleAllBtn = !this.toggleAllBtn;
    this.todoDataList.forEach((data) => {
      data.Status = this.toggleAllBtn;
    });
    this.http.put('/api/todo2_16/Status' + this.toggleAllBtn, null).subscribe()
  }

  clickCheck(item: Todo) {
    item.Status = !item.Status;
    this.toggleAllBtn = this.todoDataList.every((todo) => todo.Status);
  }

  delete(item: Todo) {
    this.http.delete('/api/todo2_16/' + item.TodoId).subscribe()
    this.todoDataList = this.todoDataList.filter(x => x !== item)
  }

  add() {
    if (this.todoInputModel.trim() === '') return;
    const todo: Todo = {
      Status: false,
      Thing: this.todoInputModel,
      Editing: false,
      TodoId: ''
    };
    this.http.post<Todo>('/api/todo2_16',todo).subscribe(x => {
      return this.todoDataList.push(x);
    })
    this.toggleAllBtn = false;
    this.todoInputModel = '';
  }

  edit(item: Todo) {
    item.Editing = true;
  }

  update(item: Todo) {
    this.http.put('/api/todo2_16/' + item.TodoId,item).subscribe()
    item.Editing = false
  }

  setStatus(type: TodoStatusType) {
    this.nowTodoStatusType = type;
  }
  clearCompleted() {
    this.http.delete('/api/todo2_16/clearCompleted').subscribe();
    this.todoDataList = this.todoActive;
  }
  get getNowTodo() {
    let list: Todo[] = [];
    switch (this.nowTodoStatusType) {
      case TodoStatusType.Active:
        list = this.todoActive;
        break;
      case TodoStatusType.Completed:
        list = this.todoCompleted;
        break;
      default:
        list = this.todoDataList;
        break;
    }
    return list;
  }
  get todoActive(): Todo[] {
    return this.todoDataList.filter((x) => !x.Status);
  }
  get todoCompleted(): Todo[] {
    return this.todoDataList.filter((x) => x.Status);
  }
}
