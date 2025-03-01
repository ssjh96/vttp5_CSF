import { Component, inject, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { lineItem, purchaseOrder } from '../model';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit
{
  private fb = inject(FormBuilder)

  protected form!: FormGroup
  protected lineItems!: FormArray
  protected showDeliveryTime = true // show delivery time by default

  ngOnInit(): void {
    // create the form on initialisation
    this.form = this.createForm()
  }

  private createForm(): FormGroup 
  {
    // initialised blank lineItems array
    this.lineItems = this.fb.array([])

    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      address: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      deliveryDate: this.fb.control<string>('', [Validators.required]),
      urgent: this.fb.control<boolean>(false),
      ts1: this.fb.control<boolean>(false),
      ts2: this.fb.control<boolean>(false),
      ts3: this.fb.control<boolean>(false),

      // Place blank lineItems array into form group
      lineItems: this.lineItems
    })  
  }

  protected urgentDelivery(event: any)
  {
    this.showDeliveryTime = !event.target.checked // if urgent is true (checked), show delivery is false

    // whenever urgent checked, resets all values in the form for timeslots (ts) to false
    this.form.patchValue({
      ts1: false,
      ts2: false,
      ts3: false
    })
  }


  // LINE ITEMS
  // main FormGroup > lineItems FormArray > individual lineItem FormGroup (name by idx) > individual lineItem controls 

  // create lineItem FormGroup that goes into the FormArray
  protected createLineItem(): FormGroup
  {
    return this.fb.group({
      item: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      quantity: this.fb.control<number>(1, [Validators.required, Validators.min(1)]),
      unitPrice: this.fb.control<number>(.1, [Validators.required, Validators.min(.1)])
    })
  }

  // when event trigger addLineItem method, push a lineItem FormGroup into the lineItems FormArray
  protected addLineItem()
  {
    this.lineItems.push(this.createLineItem())
  }

  protected removeLineItem(idx: number)
  {
    this.lineItems.removeAt(idx)
  }
  

  // protected removeLineItem()

  protected processForm()
  {
    // bind form value to purchase order, po
    const po: purchaseOrder = this.form.value
    console.info('order >>> ', po)

    const li: FormArray = this.lineItems.value
    console.info('li >>> ', li)

    const lifg = this.lineItems.at(0).get("item")?.value
    console.info('lifg >>> ', lifg)

    const test: lineItem = {
      item: this.lineItems.at(0).get("item")?.value,
      quantity: this.lineItems.at(0).get("quantity")?.value,
      unitPrice: this.lineItems.at(0).get("unitPrice")?.value
    }

    console.info('test >>> ', test)

    // reset the form to blank fresh
    this.form = this.createForm()
  }



  // VALIDATIONS
  protected isCtrlValid(ctrlName : string): boolean
  {
    return !!this.form.get(ctrlName)?.valid
  }

  protected isCtrlInvalid(ctrlName : string): boolean
  {
    return !!this.form.get(ctrlName)?.invalid
  }

  protected invalid(): boolean {
    return this.form.invalid || this.lineItems.length <= 0
  }

  // Using conditional validations so user dont feel like idiot on start of form
  protected hasError(ctrlName: string): boolean 
  {
    // this.form.get(ctrlName) returns an abstract AbstractControl type
    // which is a generic superclass for:
      // FormControl (single form field)
      // FormGroup (group of controls)
      // FormArray (array of controls)

    // Accessing Properties Like .touched and .invalid
      // AbstractControl does not guarantee the presence of .touched and .invalid.
      // FormControl, however, does have these properties.
      // Without casting, TypeScript would not know for sure that the returned control has those properties.
    
    const ctrl = this.form.get(ctrlName) as FormControl
    
    return ctrl.touched && ctrl.invalid // ctrl.dirty
  }


  // not sure how to make line items validation work
  // protected isLineCtrlValid(idx: number, ctrlName : string): boolean
  // {
  //   const lineItemGroup = this.lineItems.at(idx) as FormGroup
  //   return !!lineItemGroup.get(ctrlName)?.valid
  // }

  // protected isLineCtrlInvalid(idx: number, ctrlName : string): boolean
  // {
  //   const ctrl = this.lineItems.at(idx).get(ctrlName) as FormControl

  //   return ctrl.touched && ctrl.invalid
  // }
}

