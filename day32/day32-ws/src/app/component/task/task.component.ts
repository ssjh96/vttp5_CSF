import { Component, inject, Input, Output } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Todo } from '../../model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent
{
  private fb = inject(FormBuilder)

  // Initialize tasks with blank array
  @Input() tasks: Todo[] = [];
  @Output() onDelete = new Subject<number>();

  protected removeTodo(idx: number)
  {
    this.onDelete.next(idx)
  }
    
  

  


  
}
