import { Component } from '@angular/core';
import * as jsonData from "../../../../public/countries.json"; // jsonData is just a name that represents the json file

@Component({
  selector: 'app-json-reader',
  standalone: false,
  templateUrl: './json-reader.component.html',
  styleUrl: './json-reader.component.css'
})
export class JsonReaderComponent 
{
  data: any = jsonData

  selectedCountry: string = '' // Stores the selected category
  protected updateCountry(event: any) 
  {
    this.selectedCountry = event.target.value // Update the category based on selection
    console.log("selectedCountry", this.selectedCountry) 
  }
  

}
