import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-select-items',
  standalone: false,
  templateUrl: './select-items.component.html',
  styleUrl: './select-items.component.css'
})
export class SelectItemsComponent 
{
  picture = '/fruits/strawberry.png'
  
  @Output()
  onSelect = new Subject<number>()

  protected itemSelected(event: any)
  {

  }

}
