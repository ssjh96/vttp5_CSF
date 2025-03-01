import { Component, Output, output } from '@angular/core';
import { pageEvent } from '../model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent 
{
  // Declare an event emitter
  @Output()
  onNavigate = new Subject<pageEvent>

  private step = 1;

  protected page(delta : number)
  {
    console.info("delta is: ", delta)

    const pageEvent: pageEvent = {
      delta: delta,     // delta is the +/-1
      step: this.step   // step is change from updateStep method
    }

    // emits the pageEvent object to the parent (AppComponent) where pageEvent contains ( {delta, step} )
    this.onNavigate.next(pageEvent)
    // .next is a function in Subject that emits an event
    // @output properties uses subject to emit data

    // <app-pagination (onNavigate)="whenNavigate($event)"></app-pagination>
    // AppComponent listens to event and executes whenNavigate() whenever it receives new data
    // $event receives the emitted object ( {delta, step} )
  }
  
  // everytime change detected, step is updated. By default=1
  protected updateStep(event: any)
  {
    this.step = parseInt(event.target.value); // step is a string since value "1", etc
    console.info("step is", this.step)
  }
}
