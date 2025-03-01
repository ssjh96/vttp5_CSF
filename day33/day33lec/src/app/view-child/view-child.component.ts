import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-child',
  standalone: false,
  templateUrl: './view-child.component.html',
  styleUrl: './view-child.component.css'
})
export class ViewChildComponent implements OnInit
{
  childText: string = 'Default String';

  changeText()
  {
    this.childText='Updated by ViewChild';
  }

  // part 2
  productForm!: FormGroup;
  rows!: FormArray;
  constructor(private fb: FormBuilder)
  {
    // this.productForm = fb.group({
    //   rows: fb.array([], [Validators.required])
    //   // items_values: ['no', Validators.required] // for toggle button
    // });

    // this.rows = fb.array([]);
  }

  protected createForm(): FormGroup
  {
    this.rows = this.fb.array([]);

    return this.fb.group({
      rows: this.rows
    });
  }
  
  public get dynamicRows() : FormArray {
    return this.productForm.get('rows') as FormArray;
  }
  
  // for button to add new row
  protected onAddRow(): void {
    // this.rows.push(this.fb.group({
    //   name: null,
    //   description: null,
    //   qty: null
    // }));

    this.rows.push(this.createFormItem());
  }


  protected createFormItem(): FormGroup {
    return this.fb.group({
      name: null,
      description: null,
      qty: null
    });
  }

  ngOnInit(): void {
    this.productForm = this.createForm();
  }

}
