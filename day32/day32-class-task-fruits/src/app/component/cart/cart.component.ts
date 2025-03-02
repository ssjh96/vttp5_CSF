import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../../model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnChanges
{
  // for receiving cartData from parent
  @Input() cart: Product[] = []; 

  private fb = inject(FormBuilder)
  orderForm!: FormGroup
  lineItemsArray!: FormArray

  ngOnInit(): void {
    this.orderForm = this.createOrderForm()
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
      console.log("Form Submitted: ", this.orderForm.value)
    }
    else
    {
      console.log("Please check your inputs..")
    }
  }

  protected removeItem(idx: number): void
  {
    this.lineItemsArray.removeAt(idx);
  }





}
