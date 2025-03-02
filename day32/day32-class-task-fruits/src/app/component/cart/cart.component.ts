import { Component, Input } from '@angular/core';
import { Product } from '../../model';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent 
{
  // for receiving cartData from parent
  @Input() cart: Product[] = []; 
  
}
