import { Component, inject, OnInit } from '@angular/core';
import { Todo } from './model';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent 
{
  title = 'day32-ws';

  // Received Todo from Todo-component
  // Initialize tasks with blank array for populating and passing to task-component
  tasks: Todo[] = []; 

  protected addToTask(todo: Todo): void
  {
    this.tasks.push(todo);
    console.log("Tasks: ", this.tasks)
  }

  protected handleDelete(idx: number): void
  {
    this.tasks.splice(idx, 1);
    console.log("Tasks: ", this.tasks)
  }
  

}
