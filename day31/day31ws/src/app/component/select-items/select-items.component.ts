import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Fruit } from '../../model';

@Component({
  selector: 'app-select-items',
  standalone: false,
  templateUrl: './select-items.component.html',
  styleUrl: './select-items.component.css'
})
export class SelectItemsComponent 
{
  // picture = '/fruits/strawberry.png'
  
  @Input() fruits: Fruit[] = []; // to receive fruits from parent 
  
  @Output() onSelect = new Subject<Fruit>() // to send selected fruit to parent 

  protected itemSelected(fruit: Fruit)
  { 
    console.log("select component fruit: ", fruit)
    this.onSelect.next(fruit); // Emit selected fruit to parent
  }

}
