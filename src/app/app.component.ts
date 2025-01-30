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
    this.http.get<Todo[]>('/api/todo2_16').subscribe(x => {
      this.todoDataList = x
    })
  }
  toggleAll() {
    this.toggleAllBtn = !this.toggleAllBtn;
    this.todoDataList.forEach((data) => {
      data.Status = this.toggleAllBtn;
    });
  }

  clickCheck(item: Todo) {
    item.Status = !item.Status;
    this.toggleAllBtn = this.todoDataList.every((todo) => todo.Status);
  }

  delete(index: number) {
    this.todoDataList.splice(index, 1);
  }

  add() {
    if (this.todoInputModel.trim() === '') return;
    const todo: Todo = {
      Status: false,
      Thing: this.todoInputModel,
      Editing: false,
    };
    this.todoDataList.push(todo);
    this.toggleAllBtn = false;
    this.todoInputModel = '';
  }

  edit(item: Todo) {
    item.Editing = true;
  }

  setStatus(type: TodoStatusType) {
    this.nowTodoStatusType = type;
  }
  clearCompleted() {
    this.todoDataList = this.todoDataList.filter((x) => !x.Status);
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
