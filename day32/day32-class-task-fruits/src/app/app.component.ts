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

  protected handleRemove(idx: number)
  {
    // Reset product quantity
    this.cartData[idx].quantity = 0

    // Remove from cart array
    this.cartData.splice(idx, 1);

    // Force update by reassigning cart (to trigger ngOnChanges)
    this.cartData = [...this.cartData];

    console.log('parent cart data: ', this.cartData)
  }

  protected handleClearCart(resetCart: Product[])
  {
    this.cartData = resetCart // pass in blank to reset
  }


  protected handleSelection(product : Product) 
  {
    if (product.delta == 1) {
      if(!this.cartData.includes(product)) 
      {
        product.quantity++;
        this.cartData.push(product);
      }
      else
      {
        product.quantity++;
      }
      
    } 
    else if (product.delta == -1) 
    {
      if(this.cartData.includes(product)) 
      {
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

    // console.log('cartData:', this.cartData);
    // console.log('productData: ', this.productsData)




    /*  // Create a new object to avoid referencing the original
    const selectedProduct = { ...product }
    console.log("selected Product: ", selectedProduct)
    console.log("Product: ", this.productsData)


    if (product.delta === 1) {
      selectedProduct.quantity = (selectedProduct.quantity || 0) + 1;
  
      const existingIndex = this.cartData.findIndex(p => p.name === selectedProduct.name);
      if (existingIndex === -1) {
        this.cartData.push(selectedProduct);
      } else {
        this.cartData[existingIndex].quantity += 1;
      }
    } 
    else if (product.delta === -1) {
      const existingIndex = this.cartData.findIndex(p => p.name === selectedProduct.name);
      if (existingIndex !== -1) {
        this.cartData[existingIndex].quantity -= 1;
        if (this.cartData[existingIndex].quantity === 0) {
          this.cartData.splice(existingIndex, 1);
        }
      }
    }
  
    // Ensure Angular detects the change
    this.cartData = [...this.cartData];
  
    console.log('Updated cartData:', this.cartData); */
  }    
}

