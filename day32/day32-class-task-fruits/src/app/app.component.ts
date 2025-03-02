import { Component, inject, OnInit } from '@angular/core';
import { Product } from './model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit
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

  protected handleSelection(product : Product)
  {
    if (product.delta == 1)
    {
      if(!this.cartData.includes(product))
        {
          product.quantity++;
          this.cartData.push(product);
          console.log("cart data: ", this.cartData);
        }
        
        product.quantity++;
        console.log("cart data: ", this.cartData);
    }

    else if (product.delta == -1)
    {
      if(this.cartData.includes(product))
        {
          product.quantity--;

          if(product.quantity == 0)
          {
            // p is the parameter representing each product in cartData as it is iterated
            // p.name === product.name
            // This compares the name of the current product (p.name) with product.name (the one we're looking for).
            // If a match is found, findIndex() returns the index of that product in the array.
            const productIndex = this.cartData.findIndex(p => p.name === product.name) 

            this.cartData.splice(productIndex, 1);
          }
          console.log("cart data: ", this.cartData);
        }
    }
  }



  // FORM
  private fb = inject(FormBuilder)
  orderForm!: FormGroup
  lineItemsArray!: FormArray

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


    
}

