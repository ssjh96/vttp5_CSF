import { Component, Input, Output } from '@angular/core';
import { Fruit } from '../../model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  @Input()
  cart: Fruit[] = [];

  // @Output() onRemove = new Subject<Fruit>();
  @Output() onRemove = new Subject<number>();
  
  protected removeFruit(idx: number)
  {
    // const removeFruit = this.cart[idx] // get the fruit that is being removed
    this.onRemove.next(idx) // emit event to notify appComponent
  }


  // fruit is the reference to the fruit object in the cart
  protected decrementQuantity(idx: number, fruit: Fruit)
  {
    if(fruit.quantity == 1)
    {
      console.log("idx: ", idx, "cart component fruit: ", fruit)
      
      // this.cart.splice(idx, 1); // remove fruit from cart if only 1 left
      this.removeFruit(idx)
    }
    else
    {
      fruit.quantity--; // decrease the quantity by 1
      console.log("idx: ", idx, "cart component fruit: ", fruit)
    }

    console.log("cart component cart: ", this.cart)
  }

  

  protected incrementQuantity(idx: number, fruit: Fruit)
  {
    fruit.quantity++;
    console.log("cart component cart: ", this.cart)
  }

}
