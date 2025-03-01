import { Component, OnInit } from '@angular/core';
import { from, map, tap } from 'rxjs';

@Component({
  selector: 'app-example',
  standalone: false,
  templateUrl: './example.component.html',
  styleUrl: './example.component.css'
})
export class ExampleComponent implements OnInit
{
  // NUMBERS
  // numbersArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  numbersArray = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // import from rxjs to make it observable?

  multiplyBy3() {
    this.numbersArray
    .pipe(map(data => {return data*3})) // Multiply each emitted number by 3
    .subscribe(data => {console.log(data);}); // print the result
  }

  // FOOD
  foodAArray = from(['Pizza', 'Burger', 'Sandwich', 'Pasta', 'Briyani']);

  toUpperCase() {
    this.foodAArray
    .pipe(map(data => {return data.toUpperCase();})) // Convert each emitted string to uppercase
    .subscribe(data => {console.log(data);}); // print the result
  }

  nameArray = from([
    {fname: 'John', lname: 'Cena'},
    {fname: 'David', lname: 'Letterman'},
    {fname: 'Will', lname: 'Smith'}
  ])

  concateToFullName() {
    this.nameArray
    .pipe(map(data => {return data.fname + ' ' + data.lname;})) // Concatenate first name and last name
    .subscribe(data => {console.log(data);}); // print the result
  }

  numberSeries = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  sumOfNumbers() {
    this.numberSeries
      .pipe(tap(data => { console.log('Tapping: ' + (data+1) )})) // what is tapping? try not to tap and mutate the data?
      .pipe(map(data => {return data * 3}))
      .subscribe(data => { console.log('Subscribe: ' + data);}); // print the result
  }

  constructor() {}

  ngOnInit(): void {
    this.multiplyBy3();
    this.toUpperCase();
    this.concateToFullName();
    this.sumOfNumbers();
  }


}
