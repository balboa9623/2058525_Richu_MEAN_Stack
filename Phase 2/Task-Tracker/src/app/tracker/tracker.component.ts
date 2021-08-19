import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface TaskData {
  id: string;
  name: string;
  task: string;
  deadline: string;
}

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css'],
})
export class TrackerComponent implements OnInit {
  taskList: Array<TaskData> = [];

  displayColumns: string[] = ['id', 'name', 'task', 'deadline'];
  dataSource:Array<TaskData> = [];

  deadline: string = '';

  displayTable: boolean = true;
  refreshCounter: number = 0;

  constructor() {}

  ngOnInit(): void {}

  inputEvent(event: { value: any }) {
    this.deadline =
      event.value.getMonth() +
      1 +
      '/' +
      event.value.getDate() +
      '/' +
      (event.value.getYear() + '').charAt(1) +
      (event.value.getYear() + '').charAt(2);
  }
  changeEvent(event: { value: any }) {
    this.deadline =
      event.value.getMonth() +
      1 +
      '/' +
      event.value.getDate() +
      '/' +
      (event.value.getYear() + '').charAt(1) +
      (event.value.getYear() + '').charAt(2);
  }

  addTask(todoRef: NgForm) {
    let newTask = todoRef.value;

    // console.log(this.deadlineDate);

    const tmpTask: TaskData = {
      id: newTask.empId,
      name: newTask.name,
      task: newTask.task,
      deadline: this.deadline,
    };

    this.taskList.push(tmpTask);

    this.dataSource = this.taskList;

    console.log(this.dataSource);
  }

  toggleTable(){
    
    this.dataSource = this.taskList;
    this.displayTable = !this.displayTable;
  }
}
