import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-child2',
  standalone: false,
  templateUrl: './view-child2.component.html',
  styleUrl: './view-child2.component.css'
})
export class ViewChild2Component implements OnInit{

  productForm!: FormGroup

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(private fb:FormBuilder)
  {
    this.productForm = fb.group({
      products: fb.array([])
    });
  }

  
  public get products() : FormArray {
    return this.productForm.get("products") as FormArray;
  }

  newProduct(): FormGroup
  {
    return this.fb.group({
      name: '',
      description: '',
      qty: ''
    });
  }

  addProduct(): void{
    this.products.push(this.newProduct);
  }

  removeProdcut(idx: number): void{
    this.products.removeAt(idx)
  }

  processForm(): void{
    console.log(">>> log: ", this.productForm.value)
  }

  

}
