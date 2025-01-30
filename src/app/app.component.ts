import { Component, OnInit } from '@angular/core';

import { Todo, TodoClass, TodoStatusType } from '../@models/todo.models';
import { TodoApiService } from './todo-api.service';

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

  constructor(private todoApiService: TodoApiService) {}
  ngOnInit(): void {
    this.getDate()
  }
  getDate() {
    this.todoApiService.getData().subscribe(x => {
      this.todoDataList = x
    })
  }
  toggleAll() {
    this.toggleAllBtn = !this.toggleAllBtn;
    this.todoDataList.forEach((data) => {
      data.Status = this.toggleAllBtn;
    });
    this.todoApiService.toggleAll(this.toggleAllBtn).subscribe()
  }

  checkToggleAll() {
    this.toggleAllBtn = this.todoCompleted.length === this.todoDataList.length
  }
  clickCheck(item: Todo) {
    item.Status = !item.Status;
    this.todoApiService.update(item).subscribe()
    this.checkToggleAll()
  }

  delete(item: Todo) {
    this.todoApiService.delete(item).subscribe()
    this.todoDataList = this.todoDataList.filter(x => x !== item)
  }

  add() {
    if (this.todoInputModel.trim() === '') return;
    const todo: Todo = new TodoClass(this.todoInputModel, false)
    this.todoApiService.add(todo).subscribe(x => {
      this.todoDataList.push(x);
    })
    this.toggleAllBtn = false;
    this.todoInputModel = '';
  }

  edit(item: Todo) {
    item.Editing = true;
  }

  update(item: Todo) {
    this.todoApiService.update(item).subscribe()
    item.Editing = false
  }

  setStatus(type: TodoStatusType) {
    this.nowTodoStatusType = type;
  }
  clearCompleted() {
    this.todoApiService.clearCompleted().subscribe();
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
