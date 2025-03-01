import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member, MemberClass } from '../model/member';

@Component({
  selector: 'app-member',
  standalone: false,
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent implements OnInit
{
  member = new MemberClass('', '', '', ['']) // doing by class

  memberForm!: FormGroup
  hobbiesArray!: FormArray
  private fb = inject(FormBuilder)

  ngOnInit(): void {
    this.memberForm = this.createForm();
  }

  protected createForm(): FormGroup
  {
    this.hobbiesArray = this.fb.array([])
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      phone: this.fb.control<string>('', [Validators.required, Validators.pattern('^[89][0-9]{7}$')]),

      hobbies: this.hobbiesArray
    })
  }

  
  protected addHobby(): void
  {
    const hobbyGroup = this.fb.group({
      hobby: this.fb.control<string>('')
    })
    this.hobbiesArray.push(hobbyGroup);
  }

  protected removeHobby(idx: number): void
  {
    this.hobbiesArray.removeAt(idx)
  }

  protected processForm(): void
  {
    // console.info("Form submitted succesfully: ", this.memberForm.value)

    if(this.memberForm.valid)
    {
      const member: Member = this.memberForm.value as Member;
      console.info('Form submitted: ', member)
    }
    else
    {
      console.warn('Form is invalid, please check your inputs')
    }
  }

  processMemberForm()
  {
    this.member.name = this.memberForm.value.name;
    this.member.email = this.memberForm.value.email;
    this.member.phone = this.memberForm.value.phone;
    this.member.hobbies = this.memberForm.value.hobbies;
  }


  // VALIDATIONS
  // protected isValid(ctrlName: string): boolean
  // {
  //   return !!this.memberForm.get(ctrlName)?.valid
  // }

  // protected isInvalid(ctrlName: string): boolean
  // {
  //   return !!this.memberForm.get(ctrlName)?.invalid
  // }

  protected isValid(ctrlName: string): boolean {
    const ctrl = this.memberForm.get(ctrlName);
    return !!ctrl?.valid && ctrl.dirty;
  }

  protected isInvalid(ctrlName: string): boolean {
    const ctrl = this.memberForm.get(ctrlName);
    return !!ctrl?.invalid && ctrl.dirty;
  }

}
