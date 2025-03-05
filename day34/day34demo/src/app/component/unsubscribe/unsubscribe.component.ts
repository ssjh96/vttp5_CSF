import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-unsubscribe',
  standalone: false,
  templateUrl: './unsubscribe.component.html',
  styleUrl: './unsubscribe.component.css'
})
export class UnsubscribeComponent 
{
  counter = interval(1000) // after each sec will emit a number in seq
  // interval returns an observable, that will emit number 
  data: number[] = []
  counterSub$ !: Subscription

  // subscribe to counter obs when subcribe button is click
  protected onSubscribe()
  {
    this.counterSub$ = this.counter.subscribe((val) => {
      console.log("subscribed called")
      this.data.push(val)
      console.log("val: ", val)

    })
  }

  protected onUnsubscribe()
  {
    console.log("unsubscribed called")
    this.counterSub$.unsubscribe()
  }
}
