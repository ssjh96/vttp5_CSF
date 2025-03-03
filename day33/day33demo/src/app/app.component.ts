import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RegistrationComponent } from './component/registration/registration.component';
import { Registration } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  
  title = 'day33demo';

  // Change Detection Demo
  // A simple numeric counter (primitive type)
  counter = 0;

  // An array of numbers (reference type)
  numbers: number[] = [1,2,3]


  // When count is reassigned a new value, change detection occurs:
  // view is updated and the value is pushed to the component

  /**
   * Increments the counter by 1.
   * Because 'counter' is a primitive type, Angular immediately detects
   * the change and updates the view.
   */
  protected incrementCounter()
  {
    this.counter++;
  }

  // When a new element is push to values, the array changes but the variable to the array did not change View is update but the new element is not pushed to the component

  /**
   * Adds a new number to the array "in place" (mutate in place).
   * This modifies the existing array rather than creating a new array object.
   * The array 'numbers' reference remains the same, so Angular might
   * not always detect the change in some scenarios (especially in more
   * advanced change detection strategies).
   */
  addNumberWithoutNewReference()
  {
    this.numbers.push(this.numbers.length + 1)
  }
  
  // this.values = [ ...this.values, newValue ], Recreating the reference type with the new value
  // Spreading (i.e., copying) all the existing elements of this.numbers into a new array.
  // Appending a new value, which is this.numbers.length + 1.

  /**
   * Adds a new number by creating a brand-new array (using the spread operator).
   * This changes the array's reference, which tells Angular that 'numbers'
   * is different. Angular will detect the change and update any child
   * components bound to 'numbers'.
   */
  addNumberWithNewReference() {
    this.numbers = [...this.numbers, this.numbers.length + 1];
  }

  
  @ViewChild('regForm1')
  regComponent!: RegistrationComponent  // <-- This is the key

  // combining viewchild and content projection
  ngAfterViewInit(): void {
    // instead of using attribute binding, programaticallly set the component attribute. component only accessible afterviewinit
    // We can set child properties here

    // Once the child (RegistrationComponent) is initialized,
    // we can set properties on it

    // this.regComponent.title = "New Product Registraion"
    // Usage: It schedules a task to run after a specified delay.
    setTimeout(() => {
      // Code that needs to run after the current change detection cycle.
      this.regComponent.title = "New Product Registration";
    }, 0);
  }

  processRegistration() // parent method
  { 
    // // We can also read data or call methods from the child component
    // can access methods/properties in RegistrationComponent

    const newReg: Registration = this.regComponent.getValues // child method

    // button pressed, get values from component (read child form data)
    // do something with newReg data
    console.log("Form Data: ", newReg)

    alert('Processing Registration...');
  }

  processShowValue() {
    this.regComponent.showValues(); // calls the child's method
  }


  // setInterval example
  protected intervalId: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      console.log("This prints every 2 seconds.");
      // Perform periodic tasks, e.g., updating a value.
    }, 2000);
  }

  ngOnDestroy(): void 
  {
    // Clear the JavaScript interval.
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
