import { Component, Input, Output } from '@angular/core';
import { Product } from '../../model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-inventory',
  standalone: false,
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent 
{
  // for receiving productsData from parent
  @Input() products: Product[] = [];
  @Output() onSelect = new Subject<Product>();


  protected addProduct(product: Product): void
  {
    product.delta = 1
    this.onSelect.next(product);
  }

  protected removeProduct(product: Product): void
  {
    product.delta = -1
    this.onSelect.next(product);
  }
}
