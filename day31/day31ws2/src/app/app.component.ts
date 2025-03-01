import { Component } from '@angular/core';
import { pageEvent } from './model';

const num_images = 31 // global constant within the file
// It doesnt change, accessible by methods like whenNavigate() without needed this. .

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'day31ws2';
  imagePath ="/numbers/number0.jpg"
  pageSkip=0
  currIndex=0

  protected whenNavigate(pageEvent: pageEvent)
  {
    // calc how many steps to jump (e.g. d=-1, s=3, ps = -3)
    this.pageSkip = pageEvent.delta * pageEvent.step

    // updates the image index (e.g. ci = -3)
    this.currIndex += this.pageSkip

    // if currIndex < 0, 
    // cannot go backwards beyound number0.jpg
    // currIndex = -2, 
    // num_images = 31, 
    // currIndex = 31 + (-2) = 29
    if(this.currIndex < 0) 
    {
      this.currIndex = num_images + this.currIndex
    }
    
    // if we went beyond number30.jpg
    // % to loop back to the start
    // currIndex = 32
    // num_images = 31
    // currIndex = 32 % 31 = 1
    else if (this.currIndex >= num_images)
    {
      this.currIndex %= num_images
    }

    // if within 0-30, just display without the conditionals
    this.imagePath=`/numbers/number${this.currIndex}.jpg`
    // back ticks ` ` allows string interpolation whereas '' treats as static string

  }
  
}
