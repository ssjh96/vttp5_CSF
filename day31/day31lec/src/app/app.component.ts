import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'My first angular application';
  myText = 'this is my text'

  texts: string[] = []
  
  // [
  //   "How much wood could a woodchuck chuck", 
  //   "if a woodchuck could chuck wood"
  // ]

  allClicks = 0

  whenNewText(newText: string) {
    this.texts.push(newText)
  }
  
  // Event Handler
  whenTotalClicks(idx: number, clicks: number)
  {
    console.info('>>>>> got totalClicks event', clicks)
    console.info(`>>>>> got clicks ${clicks} from ${idx + 1}`) // string interpolation?
    this.allClicks += clicks
  }
}
