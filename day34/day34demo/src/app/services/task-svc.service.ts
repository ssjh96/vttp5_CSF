import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root' // want to provide the svc from the root mod (app mod)
})
export class TaskSvcService {

  constructor() { }

  // createTaskEE: EventEmitter<string> = new EventEmitter<string>();

  createTask = new Subject<string>() // subject are a special type of observable that can be multicasted to many observers

  // a subject is multicast, an object is unicast

  public tsOnCreateTask(value: string)
  {
    console.log('svc value: ', value)
    // this.createTaskEE.emit(value);
    this.createTask.next(value);
    
  }
}
