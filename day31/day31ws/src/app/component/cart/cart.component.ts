import { Component, Input, Output } from '@angular/core';
import { Fruit } from '../../model';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  @Input()
  cart: Fruit[] = [];
  
  protected removeFruit(idx: number)
  {
    this.cart.splice(idx, 1);
    console.log("cart component cart: ", this.cart)
  }

  protected decrementQuantity(idx: number, fruit: Fruit)
  {
    if(fruit.quantity == 1)
    {
      console.log("idx: ", idx, "cart component fruit: ", fruit)
      this.cart.splice(idx, 1); // remove fruit from cart if only 1 left
    }
    else
    {
      fruit.quantity--; // decrease the quantity by 1
      console.log("idx: ", idx, "cart component fruit: ", fruit)
    }

    console.log("cart component cart: ", this.cart)

  }

}
