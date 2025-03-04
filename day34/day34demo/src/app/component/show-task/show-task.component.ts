import { Component, inject, OnInit } from '@angular/core';
import { TaskSvcService } from '../../services/task-svc.service';

@Component({
  selector: 'app-show-task',
  standalone: false,
  templateUrl: './show-task.component.html',
  styleUrl: './show-task.component.css'
})
export class ShowTaskComponent implements OnInit
{
  
  tasks: string[] = ['task 1', 'task 2', 'task 3']

  private taskService: TaskSvcService = inject(TaskSvcService)

  ngOnInit(): void {

    /* // subscribe to the event using EVENTEMITTER
    this.taskService.createTaskEE.subscribe({
      next: (newTask: string) => { 
        this.tasks.push(newTask) 
        console.log("tasks: ", this.tasks)
      }
    }) */

    // subscribe to the event using SUBJECTS
    this.taskService.createTask.subscribe({
      next: (newTask: string) => { 
        this.tasks.push(newTask) 
        console.log("tasks: ", this.tasks)
      }
    })

    
  }
  // show and new task are not related but we are able to pass data from one component to the other using services and event emitters or subjects
  // subjects is nth but an observable***


  // http request and response > method used to make a http request to the server, returns an observable

}
