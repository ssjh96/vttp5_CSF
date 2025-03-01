import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'day32test';
  date = new Date()
  date1 = new Date().toDateString()
  date2 = new Date().toISOString()
  date3 = new Date().toISOString().split('T')
  date4 = new Date().toISOString().split('T')[0]

  // for ngswitch test
  selectedCategory: string = '' // Stores the selected category
  protected updateCategory(event: any) 
  {
    this.selectedCategory = event.target.value // Update the category based on selection
    console.log("selectedCategory", this.selectedCategory) 
  }
}
