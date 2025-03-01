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
  cartData: Fruit[] = []; // initially empty

  // add fruit to cart
  // fruit is the reference to the fruit object in the cart
  protected addToCart(fruit: Fruit)
  {
    if(!this.cartData.includes(fruit)) // if fruit is not in cart
    {
      console.log("parent fruit: ", fruit)
      fruit.quantity = 1;
      this.cartData.push(fruit);
      console.log('fruitsData: ', this.fruitsData, "cartData: ", this.cartData)
    }
  }

  
  // protected handleRemove(fruit: Fruit)
  // {
  //   fruit.quantity = 0 // this reference both cartData and fruitsData
  // } 
  // 

  protected handleRemove(idx: number)
  {
    this.cartData.splice(idx, 1) // removes from cartData for re-adding
    // cartData is being reference by cart component
  }

  


}
