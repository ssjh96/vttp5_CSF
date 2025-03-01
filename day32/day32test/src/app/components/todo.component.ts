import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TODO } from '../model';

@Component({
  selector: 'app-todo',
  standalone: false,
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit
{
  todoForm!: FormGroup // Main form (that holds Array of Group)
  todoArray!: FormArray // Array of todosGroup
  // todoGroup!: FormGroup 
  // FormArray holds the FormGroup

  private fb = inject(FormBuilder)

  ngOnInit(): void 
  {
    // on intialisation
    this.todoArray = this.fb.array([]) // blank array for adding todoGroups

    // place the blank array inside the main form first
    this.todoForm = this.fb.group({
      todos: this.todoArray
    })
  }

  protected addTodoGroup(): void
  {
    const todoGroup = this.fb.group({
      // defaults to today's date
      date: this.fb.control<string>(new Date().toISOString().split('T')[0]), 
      description: this.fb.control<string>(''),
      priority: this.fb.control<string>('low')
    })

    // push a new todoGroup everytime we call this method
    this.todoArray.push(todoGroup)
  }

  protected removeTodoGroup(idx: number): void
  {
    this.todoArray.removeAt(idx)
  }
  

  protected processForm()
  {
    const todo: TODO = this.todoForm.value as TODO

    if(this.todoForm.valid)
    {
      console.info('TODO list submitted: ', todo)
    }
    else
    {
      console.warn('Form is invalid, please check your inputs')
    }
  }
}
