import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { RSVP } from '../model';
import { HttpClient } from '@angular/common/http';

// Custom Validations
const nonWhiteSpace = (ctrl: AbstractControl) => {
  if(ctrl.value.trim().length > 0)
  {
    return(null) // returns null if no error
  }
  return {nonWhiteSpace: true} as ValidationErrors
}

const noNumbers = (ctrl: AbstractControl): ValidationErrors | null => {
  if (/^[A-Za-z\s]+$/.test(ctrl.value)) {
    return null; // No error (only letters)
  }
  return { noNumbers: true }; // Error if numbers exist
}

// /..../ : Starts and ends a regular expression in JavaScript.
// ^ : start of string
// \d : any digit 0-9
// + one or more of the previous charater, (\d+ means "one or more digits")
// $ End of the string
// .test() is a built-in JavaScript function that checks if a string matches the regex pattern.

// const regex = new RegExp("^\d+$");
// console.log(regex.test("123")); 
// /^[0-9]+$/ = /^\d+$/

const onlyNumbers = (ctrl: AbstractControl): ValidationErrors | null => {
  if(/^\d+$/.test(ctrl.value)) {
    return null; // No error (only letters)
  }
  return { noNumbers: true }; // Error if numbers exist
}

@Component({
  selector: 'app-rsvp',
  standalone: false,
  templateUrl: './rsvp.component.html',
  styleUrl: './rsvp.component.css'
})

// Step 2: Define the Form Model (rsvp.component.ts)
// 1. implement OnInit
// 2. implement method 
// 3. define from (rsvpForm) as a FormGroup
export class RsvpComponent implements OnInit
{
  protected rsvpForm!: FormGroup // Define the form group

  constructor(private fb: FormBuilder) {}
  // private fb inject(FormBuilder)

  

  ngOnInit(): void 
  {
    this.rsvpForm = this.createForm()
  }

  private createForm(): FormGroup
  {
    const rsvpForm = this.fb.group({
      // name: this.fb.control(''),
      // email: this.fb.control(''),
      // phone: this.fb.control(''),
      // attending: this.fb.control('')

      name: this.fb.control<string>('', [Validators.required, Validators.minLength(3), nonWhiteSpace, noNumbers]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),

      // ^: start of str, [89]: 8 or 9, [0-9]{7}: next 7 digits 0-9, $: end of str
      phone: this.fb.control<string>('', [Validators.required, Validators.pattern('^[89][0-9]{7}$'), onlyNumbers]),
      attending: this.fb.control<string>('',[Validators.required])
      
    })

    return rsvpForm;
  }
  
  protected processForm()
  {
    if(this.rsvpForm.valid)
    {
      const rsvp: RSVP = this.rsvpForm.value as RSVP;
      console.info('Form submitted: ', rsvp)
    }
    else
    {
      console.warn('Form is invalid, please check your inputs')

      // Object.keys get all control name (name, email, phone, attending)
      Object.keys(this.rsvpForm.controls).forEach(
        (key) => {
          // this.rsvpForm.get(key)?.errors fetches each control’s errors (if any).
          const controlErrors = this.rsvpForm.get(key)?.errors

          if(controlErrors) 
          {
            console.warn(`Errors for ${key}: `, controlErrors)
          }
        }
      )

      // console.info('errors: ', this.rsvpForm.errors) 
      // console.table(this.rsvpForm.errors);
      // the form is a FormGroup and does not have its own .errors, therefore the result is null
      // .errors only exist at the FormGroup level if the group has custom validators.

      // Angular's built-in validators (like Validators.required, Validators.email, etc.) do not set errors at the FormGroup level.
      // Each control (name, email, etc.) has its own .errors object.
      
    }
  }

  // VALIDATIONS
  protected isValid(ctrlName: string): boolean
  {
    return !!this.rsvpForm.get(ctrlName)?.valid
  }

  protected isInvalid(ctrlName: string): boolean
  {
    return !!this.rsvpForm.get(ctrlName)?.invalid
  }

  protected hasErrorCheck(ctrlName: string): boolean
  {
    return !!this.rsvpForm.get(ctrlName)?.hasError
  }

  protected touchedAndInvalid(ctrlName: string): boolean
  {
    const ctrl = this.rsvpForm.get(ctrlName) as FormControl
    return ctrl.touched && ctrl.invalid
  }

}
