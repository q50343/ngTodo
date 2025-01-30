import { Injectable } from '@angular/core';
import { Todo, TodoClass, TodoStatusType } from 'src/@models/todo.models';
import { TodoApiService } from './todo-api.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  [x: string]: any;
  toggleAllBtn = false;
  nowTodoStatusType = TodoStatusType.All;
  todoDataList: Todo[] = [];
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

  constructor(private todoApiService: TodoApiService) { 
    this.getDate()
  }
  ngOnInit(): void {
      this.getDate()
    }
    getDate() {
      this.todoApiService.getData().subscribe(x => {
        this.todoDataList = x
      })
    }
    add(value: string) {
      if (value.trim() === '') return;
      const todo: Todo = new TodoClass(value, false)
      this.todoApiService.add(todo).subscribe(x => {
        this.todoDataList.push(x);
      })
      this.toggleAllBtn = false;
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
}
