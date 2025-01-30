export interface Todo {
  Status: boolean;
  Thing: string;
  Editing: boolean;
  TodoId: string
}

export class TodoClass implements Todo {
  Status: boolean;
  Thing: string;
  Editing: boolean;
  TodoId: string

  constructor(_thing: string, _status: boolean = false) {
    this.Thing = _thing;
    this.Status = _status;
    this.Editing = false;
    this.TodoId = ''
  }

  toggle() {
    this.Status = !this.Status;
  }
}
export enum TodoStatusType {
  All,
  Active,
  Completed,
}
