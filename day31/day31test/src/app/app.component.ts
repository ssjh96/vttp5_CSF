import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'day31test';

  protected sizeChanged(fontSize: string)
  {
    console.log(`font size: ${fontSize}`);
  }



  // for ngif test
  cart1 = [1,2,3] // type is any[] in typescript
  // number[]
  // string[]
  // lineItem[]
  // cart: string[] = ["apple", "banana", "cherry"];
  // cart: Array<number> = [1, 2, 3];  // Same as number[]

  protected clearCart1() {
    this.cart1 = []; // Empty the array
  }



  // for ngfor test
  cart2 = ['Apple', 'Banana', 'Cherry'];

  // array.splice(startIndex, deleteCount, newItem1, newItem2, ...);
  // cart.splice(1, 1, "Grapes"); // Removes "Banana" and adds "Grapes"
  protected removeItem(index: number) {
    this.cart2.splice(index, 1); // Remove 1 item at index no.
  }
  
  protected clearCart2() {
    this.cart2 = []; // Empty the array
  }



  // for ngswitch test
  selectedCategory: string = '' // Stores the selected category
  protected updateCategory(event: any) 
  {
    this.selectedCategory = event.target.value // Update the category based on selection
    console.log("selectedCategory", this.selectedCategory) 
  }
  


  
  

  // ngClass conditional styling test
  isDisabled = false; // input field enabled by default
  
  protected toggleInput()
  {
    this.isDisabled = !this.isDisabled
  }

  // other condn styling
  isActive = false; // Toggle state

  protected toggleButton(event: any) 
  {
    this.isActive = !this.isActive // switch between true/false
    // The button styling is placed in global css .green-button and .red-button

    console.log(event); // Logs the event object
    console.info(">>> button event value: ", event.target.textContent) // button got no value, button textContent is "Whatever you put inside"
  }




// protected means the method can be accessed within the class and its subclasses, but not from outside.
// private means it can only be accessed within the class itself.
// public means it can be accessed anywhere.

// export class AppComponent {
//   protected toggleButton() { ... }  // Only accessible inside this class and subclasses
// }



// What event.target Has value?
// event.target.value only works for elements that have a value attribute.
// Element	    Example	                                                  Has value?
// <input>	    <input type="text" (input)="handleChange($event)">	      ✅ Yes
// <textarea> 	<textarea (input)="handleChange($event)"></textarea>	    ✅ Yes
// <select>	    <select (change)="handleChange($event)">...</select>	    ✅ Yes
// <button>	    <button (click)="handleClick($event)">Click Me</button>	  ❌ No
// <div>	      <div (click)="handleClick($event)">Click Me</div>	        ❌ No



// What Methods Exist for event.target?
// event.target is an HTMLElement, so it has many properties and methods.
// Method	                                      Description
// event.target.value	                          ✅ Gets the value of an input, textarea, or select
// event.target.textContent	                    ✅ Gets the text inside an element (e.g., button, div)
// event.target.classList.add("classname")	    ✅ Adds a CSS class
// event.target.classList.remove("classname")	  ✅ Removes a CSS class
// event.target.setAttribute("attr", "value")	  ✅ Sets an attribute (e.g., setAttribute("disabled", "true"))
// event.target.getAttribute("attr")	          ✅ Gets an attribute value
// event.target.style.color = "red"	            ✅ Dynamically changes the style

// Example: Dynamically Change Button Text, clicking the button toggles its text
// protected toggleButton(event: any) {
//   if (event.target.textContent === "Activate") {
//     event.target.textContent = "Deactivate";
//   } else {
//     event.target.textContent = "Activate";
//   }
// }

  
}
