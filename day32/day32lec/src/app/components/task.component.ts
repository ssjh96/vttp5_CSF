import { Component, inject, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../models';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{

  urgency = "2"
  taskNameCtrlName = 'taskName'

  // inject() -> @Autowired
  private fb = inject(FormBuilder)

  // form model
  protected form!: FormGroup
  // form array to hold the collaborators
  protected collaborators!: FormArray

  protected updateUrgency(event: any): void // any change
  {
    this.urgency = event.target.value
  }


  ngOnInit(): void {
    console.info(">>> in ngOnInit")
    this.form = this.createForm();
  }


  // this hooks to a button "add collaborator", adds to the array
  private createCollaborator(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>(''),
      email: this.fb.control<string>('')
    })
  }

  protected addCollaborator() {
    // create the collaborator form group
    const col = this.createCollaborator()
    // add to form array
    this.collaborators.push(col)
  }

  protected removeCollaborator(idx: number)
  {
    this.collaborators.removeAt(idx)
  }

  

  private createForm(): FormGroup
  {
    // everytime we create the form, we also create collaborators array
    this.collaborators = this.fb.array([])

    const form = this.fb.group({
      // pass in the names
      taskName: this.fb.control<string>('', [ Validators.required, Validators.minLength(3) ]), // we set an initial value
      priority: this.fb.control<string>('1'), 
      dueDate: this.fb.control<string>('', [ Validators.required ]), 
      urgency: this.fb.control<number>(2), 
      comments: this.fb.control<string>(''), 
      procrastinate: this.fb.control<boolean>(false), 

      // add in the collaborator array
      collaborators: this.collaborators
    })

    return form
  }

  protected processForm(): void
  {
    // const values: any = this.form.value
    const values: Task = this.form.value

    console.info(">>> form: ", values)



    // manual assign if task model is myPriority instead of priority, name dont match
    // const values: Task = {
    //   myPriority: this.form.get('priority')?.value
    //   // type in the rest?
    // }



    // Another way (this is faster than the bottom?) if you wanna just copy things
    // const formValue = this.form.value
    // const values: Task = {
    //   // spread operator? deep copy, copy from one obj into another obj
    //   ...formValue,
    //   myPriority: formValue.priority
    // }

    

    // // equivalent to
    // // @ts-ignore if you really know what you doing but typescript complaining
    // const a: Task = {}

    // for (let k in formValue)
    // {
    //   console.log('k = ', k) // k are they keys
    //   // @ts-ignore if you really know what you doing but typescript complaining
    //   a[k] = formValue[k]
    // }

    // console.info('>>> form: ', a)
  }
  
  

  
  
  

  // what is !!, 
  // if we dont have !!, get returns abstract control or null
  // if it is null, it becomes undefined
  // typescript specified that it returns boolean, or you can boolean | undefined
  // if it is a boolean, i double !!, it doesnt change anything
  // if it is undefined, i double !!, first ! flips undefined into a boolean w value of true, ! again flips to false
  protected isCtrlValid(ctrlName : string): boolean
  {
    return !!this.form.get(ctrlName)?.valid
  }

  protected isCtrlInvalid(ctrlName : string): boolean
  {
    return !!this.form.get(ctrlName)?.invalid
  }

  protected invalid(): boolean {
    return this.form.invalid || this.collaborators.length <= 0
  }

  
  
}
