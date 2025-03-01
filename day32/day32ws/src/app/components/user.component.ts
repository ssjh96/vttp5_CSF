import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lineItemDetails, userDetails } from '../model';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit
{

  private fb = inject(FormBuilder)

  protected userForm !: FormGroup

  protected availability !: FormArray
  protected lineItems !: FormArray

  ngOnInit(): void {
    console.info(">>> in ngOnInit")
    this.userForm = this.createUserForm();
  }

  private createUserForm(): FormGroup
  {
    // Initialise availability array in this method first before assigning it
    this.availability = this.fb.array([
      this.fb.control<boolean>(false),  // index 0: 0900-1200
      this.fb.control<boolean>(false),  // index 1: 1200-1600
      this.fb.control<boolean>(false),  // index 2: 1600-2000
    ])

    // Initialise lineItems array in this method first before assigning it
    this.lineItems=this.fb.array([])

    // userForm =/= protected userForm, local var that exist in the method only
    const userForm = this.fb.group({

      // pass in attributes
      name: this.fb.control<string>('', [ Validators.required, Validators.minLength(3) ]),
      address: this.fb.control<string>('', [ Validators.required, Validators.minLength(3) ]),
      email: this.fb.control<string>('', [ Validators.required, Validators.email ]),
      deliveryDate: this.fb.control<string>('', [ Validators.required ]),

      // add in availability array of boolean
      availability: this.availability,

      urgent: this.fb.control<boolean>(false),

      // for part 2
      lineItems: this.lineItems
    })

    return userForm
  }


  protected processForm(): void
  {
    const values: userDetails = this.userForm.value
    console.info(">>> userForm: ", values)

    const values2: lineItemDetails = this.lineItems.value
    console.info(">>> lineItems: ", values2)
  }


  private createLineItem(): FormGroup {
    return this.fb.group({
      itemName: this.fb.control<string>(''),
      quantity: this.fb.control<number>(0),
      unitPrice: this.fb.control<number>(0)
    })
  }

  protected addLineItem() {
    // create the lineItemsFormGroup
    const lineItem = this.createLineItem()

    // add created lineItem formgroup to lineItems Array
    this.lineItems.push(lineItem)
  }

  protected removeLineItem(idx: number)
  {
    this.lineItems.removeAt(idx)
  }




  // VALIDATIONS CHECK
  protected isCtrlValid(ctrlName: string): boolean
  {
    // check if the given name validators valid, return true/false
    return !!this.userForm.get(ctrlName)?.valid 
  }

  protected isCtrlInvalid(ctrlName: string): boolean
  {
    // check if the given name validators invalid, return true/false
    return !!this.userForm.get(ctrlName)?.invalid 

    //? is optional chaining - prevents error if userForm.get(ctrlName) is null
    // instead of throwing error, returns undefined.
  }
  
}
