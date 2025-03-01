import { Component, Input, input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-font-size',
  standalone: false,
  templateUrl: './font-size.component.html',
  styleUrl: './font-size.component.css'
})
export class FontSizeComponent 
{
  @Input() 
  message: string = ''

  // declares an event to be fired  by the component
  @Output()
  onFontSize = new Subject<string>()

  fontSize = '1em'

  protected fontSizeChanged(event: any)
  {
    const fs = parseInt(event.target.value)
    this.fontSize = `${fs}em` // string interpolation -> number+em, 1em
    this.onFontSize.next(this.fontSize)
  }
  
}
