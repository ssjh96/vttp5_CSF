import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-text',
  standalone: false,
  templateUrl: './text.component.html',
  styleUrl: './text.component.css'
})
export class TextComponent {

  // Define a member and annotate it with @Input
  @Input()
  text: string = '' // name of the input is called text, string is lower case and defines the type
  // use {{text}} to use in text.component.html, text binds to the input

  // Define an event with number as the event payload
  @Output()
  // event name is totalClicks, subject is going to emit number?
  totalClicks = new Subject<number>()

  protected counter = 0

  // in typescript, must put a this.? java dont need but typescript must
  protected textClicked() {
    this.counter++
  }

  protected clearCounter() {
    // this event has happened, we triggered when we mouse enter
    this.totalClicks.next(this.counter) // fire the event?
    this.counter = 0
  }

  protected firedClicks(event: any){
    // This event has happened
    console.info('>>>> event', event)
    this.totalClicks.next(this.counter)
    // this.totalclicks.next(num) where totalclicks is customevent, and num is payload
  }
}
