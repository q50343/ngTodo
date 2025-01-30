import { Component } from '@angular/core';
import { Todo, TodoStatusType } from '../@models/todo.models';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'OneTodo';
  placeholder = 'What needs to be done????';
  TodoStatusType = TodoStatusType;
  todoInputModel = '';
  get getNowTodo() {
    return this.todoService.getNowTodo;
  }
  get todoActive(): Todo[] {
    return this.todoService.todoActive;
  }
  get todoCompleted(): Todo[] {
    return this.todoService.todoCompleted;
  }
  get toggleAllBtn() {
    return this.todoService.toggleAllBtn
  }
  get nowTodoStatusType() {
    return this.todoService.nowTodoStatusType
  }
  constructor(private todoService:TodoService) {}

  add() {
    this.todoService.add(this.todoInputModel)
    this.todoInputModel = ''
  }
  toggleAll() {
    this.todoService.toggleAll()
  }

  clickCheck(item: Todo) {
    this.todoService.clickCheck(item)
  }

  delete(item: Todo) {
    this.todoService.delete(item)
  }


  edit(item: Todo) {
    item.Editing = true;
  }

  update(item: Todo) {
    this.todoService.update(item)
  }

  setStatus(type: TodoStatusType) {
    this.todoService.setStatus(type);
  }
  clearCompleted() {
    this.todoService.clearCompleted()
  }

}
