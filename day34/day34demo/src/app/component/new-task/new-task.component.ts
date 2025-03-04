import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskSvcService } from '../../services/task-svc.service';

@Component({
  selector: 'app-new-task',
  standalone: false,
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent 
{

  form!: FormGroup
  newTask: string = '';

  constructor(private fb: FormBuilder){
    this.form = fb.group({
      newTask: fb.control<string>('')
    })
  }
  
  private taskService: TaskSvcService = inject(TaskSvcService)

  protected onCreateTask()
  {
    this.newTask = this.form.get('newTask')?.value
    console.log('New Task: ', this.newTask)

    // using the svc method
    this.taskService.tsOnCreateTask(this.newTask) // newtask is a string type value
  }
}
