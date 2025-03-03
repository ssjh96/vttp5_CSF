import { Component, inject } from '@angular/core';
import { Product } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent
{
  title = 'day32-class-task-fruits';

  // Products available
  productsData: Product[] = [
    { name: 'Apple', image: '/fruits/apple.png', price: 0.50, quantity: 0, delta: 0 },
    { name: 'Blueberries', image: '/fruits/blueberries.png', price: 3.50, quantity: 0, delta: 0  }, 
    { name: 'Strawberries', image: '/fruits/strawberry.png', price: 5.50, quantity: 0, delta: 0  },  
    { name: 'Tomato', image: '/fruits/tomato.png', price: 2.50,quantity: 0, delta: 0  },  
  ]

  // Empty cart for populating whatever is added
  cartData: Product[] = [];

  protected handleSelection(product : Product) {
    if (product.delta == 1) {
      if(!this.cartData.includes(product)) {
        product.quantity++;
        this.cartData.push(product);
      }
      product.quantity++;
    } 
    else if (product.delta == -1) {
      if(this.cartData.includes(product)) {
        product.quantity--;
        if(product.quantity == 0) {
          // p is the parameter representing each product in cartData as it is iterated
          // p.name === product.name
          // This compares the name of the current product (p.name) with product.name (the one we're looking for).
          // If a match is found, findIndex() returns the index of that product in the array.
          const productIndex = this.cartData.findIndex(p => p.name === product.name) 
          this.cartData.splice(productIndex, 1);
        }
      }
    }

    // ❌ This won't trigger ngOnChanges() in CartComponent
    // this.cartData.push(product);

    // ✅ This creates a new reference, triggering ngOnChanges() in CartComponent
    // this.cartData = [...this.cartData];

    // Force a new reference so child detects changes if using OnChanges
    // create a new array that contains all the items from the old cartData array.
    this.cartData = [...this.cartData];

    console.log('cartData:', this.cartData);
  }    
}

