import { Component, inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Todo } from '../../model';
import { Subject } from 'rxjs';

// Custom Validations
const futureOrPresent = (ctrl: AbstractControl) => {
  const inputDate = new Date(ctrl.value).getTime(); 
  console.log("inputDate: ", inputDate);

  const today = new Date().getTime();
  console.log("today: ", today);

  if(inputDate > today)
  {
    return(null) // return null if no error
  }

  return {futureOrPresent: true} as ValidationErrors
}



@Component({
  selector: 'app-todo',
  standalone: false,
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})



export class TodoComponent implements OnInit
{
  private fb = inject(FormBuilder)
  todoForm!: FormGroup

  @Output() onAddTodo = new Subject<Todo>();

  ngOnInit(): void {
    this.todoForm = this.createForm();
  }

  protected createForm(): FormGroup
  {
    return this.fb.group({
      description: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
      priority: this.fb.control<string>('Low'),
      dueDate: this.fb.control<string>('', [Validators.required, futureOrPresent])
    })
  }

  protected processForm(): void
  {
    // console.log("submitted info: ", this.form.value)
    const todo: Todo = this.todoForm.value as Todo

    if(this.todoForm.valid)
    {
      console.info('TODO list submitted: ', todo)
      this.onAddTodo.next(todo)
    }
    else
    {
      console.warn('Form is invalid, please check your inputs')
    }
  }


  // Validations
  protected touchedAndInvalid(ctrlName: string): boolean
  {
    const ctrl = this.todoForm.get(ctrlName) as FormControl
    return ctrl.touched && ctrl.invalid
  }

  protected isValid(ctrlName: string): boolean
  {
    return !!this.todoForm.get(ctrlName)?.valid
  }


}
