import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product, PurchaseOrder } from '../../model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnChanges
{
  
  // for receiving cartData from parent
  // ngOnChanges only works for @Input() properties where name is the key
  @Input() cart: Product[] = []; 

  // private fb = inject(FormBuilder)
  orderForm!: FormGroup
  lineItemsArray!: FormArray
  totalCost = 0

  // ngOnInit(): void {
  //   this.orderForm = this.createOrderForm()
  //  This runs after the constructor and after Angular sets up the component.
  //  Use this to set up things that rely on inputs, like fetching data based on an @Input() value.
  // }

  // constructor happens before oninit, inject fb thn use fb in createOrderForm method
   // The constructor injects FormBuilder into the component
  //  The constructor is like the “setup” function for your component class.
  constructor(private fb: FormBuilder) {
     // Here, we use the injected FormBuilder to create the form as soon as the component is constructed
    this.orderForm = this.createOrderForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['cart']){
      console.log('CHANGE DETECTED')
      // console.log("Cart data changed:", changes['cart']);
      // console.log("Previous Value:", changes['cart'].previousValue);
      // console.log("Current Value:", changes['cart'].currentValue);
      this.populateLineItemsArray();
    }
  }

  // Sync cart -> lineItemsArray
  private populateLineItemsArray(): void {
    this.lineItemsArray.clear();
    this.cart.forEach((product) => {
      const lineItem = this.fb.group({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        cost: product.price * product.quantity
      });
      this.lineItemsArray.push(lineItem);
    });
    this.sumTotal();
  }

  private sumTotal(): void 
  {
    let total = 0 // local var total
    // Loop through each control in the FormArray
    this.lineItemsArray.controls.forEach(li => {
      // Get the cost from each lineItem. Ensure cost is a number
      const cost = li.value.cost
      total += cost
    });

    this.totalCost = total // assigned to global
    console.log("total cost: ", this.totalCost)
  }

  protected createOrderForm(): FormGroup
  {
    this.lineItemsArray = this.fb.array([])

    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      address: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      delivery: this.fb.control<string>(''),

      lineItems: this.lineItemsArray
    })
  }

  protected processForm(): void
  {
    if(this.orderForm.valid)
    {
      const po: PurchaseOrder = this.orderForm.value
      console.log("Form Submitted: ", this.orderForm.value)
    }
    else
    {
      console.log("Please check your inputs..")
    }
  }

  protected removeItem(idx: number): void
  {
    const cost = this.cart[idx].price * this.cart[idx].quantity 
    this.totalCost -= cost;

    // Remove from cart array
    this.cart.splice(idx, 1);

    // Remove from FormArray
    this.lineItemsArray.removeAt(idx);

    // Force update by reassigning cart (to trigger ngOnChanges)
    this.cart = [...this.cart];

  }


  // Validations
  protected touchedAndInvalid(ctrlName: string): boolean
  {
    const ctrl = this.orderForm.get(ctrlName) as FormControl
    return ctrl.touched && ctrl.invalid
  }

  protected isValid(ctrlName: string): boolean
  {
    return !!this.orderForm.get(ctrlName)?.valid
  }

}
