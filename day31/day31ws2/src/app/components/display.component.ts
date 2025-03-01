import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display',
  standalone: false,
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent 
{
  @Input()
  // imgPathInput = "/numbers/number0.jpg"
  imgPathInput = "" // default value until parent pass in 
}
