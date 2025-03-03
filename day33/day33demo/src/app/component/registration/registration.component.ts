import { Component, Input, OnInit } from '@angular/core';
import { Registration } from '../../model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit 
{

  
  constructor(private fb: FormBuilder){}

  @Input() title!: string
  form!: FormGroup

  ngOnInit(): void 
  {
    this.form = this.fb.group({
      email: this.fb.control<string>(''),
      name: this.fb.control<string>('')
    })
  }
  
  public get getValues() : Registration {
    // Returns the current form values as a 'Registration' object
    return this.form.value as Registration
  }

  // This component can have its own logic, form controls, etc.
  // But for now, we'll keep it simple to focus on content projection.

  public showValues(){
    console.log("form values: ", this.form.value)
  }
  
}
