import { Component } from '@angular/core';
import { Fruit } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Item Cart';
  
  // initialize fruits to pump into select-items component
  fruitsData: Fruit[] = [
    { name: 'Apple', image: '/fruits/apple.png', quantity: 0 },
    { name: 'Blueberries', image: '/fruits/blueberries.png', quantity: 0 }, 
    { name: 'Strawberry', image: '/fruits/strawberry.png', quantity: 0 },  
    { name: 'Tomato', image: '/fruits/tomato.png', quantity: 0 },   
  ];

  // initialize cart to pump into cart component
  // cart has name, imageurl and quantity
  cartData: Fruit[] = []; // initially empty

  // add fruit to cart
  protected addToCart(fruit: Fruit)
  {
    if(!this.cartData.includes(fruit)) // if fruit is not in cart
    {
      console.log("parent fruit: ", fruit)
      fruit.quantity++;
      this.cartData.push(fruit);
    }
    else // if fruit is in cart
    {
      fruit.quantity++;
      console.log("parent fruit: ", fruit)
    }

    console.log("parent cart: ", this.cartData)
  }

  


}
