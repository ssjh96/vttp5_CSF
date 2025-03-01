import { AfterViewInit, Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ViewChildComponent } from './view-child/view-child.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnInit, DoCheck{
  
  title = 'day33';
  isShow: boolean = false;

  // ! - i allow the value of null, non assertion null
  // ? - can be empty, avoid null, i have will show or do smth, if dont have ignore
   // Accessing child component using @ViewChild
  @ViewChild(ViewChildComponent) childComponent!: ViewChildComponent;

  // Accessing image elements using @ViewChild and ElementRef
  @ViewChild("myImg") imageElement!: ElementRef;

  // Changes the child component's text when button is clicked
  changeChildText(){
    this.childComponent.changeText();
  }

  // Runs when the component is initialized
  ngOnInit(): void {
    this.isShow = true; // This makes the images visible (because of *ngIf)
  }

  // Runs after the View is initialized
  ngAfterViewInit(): void{
    console.log("AfterViewInit...")
    console.log(this.imageElement) // Logs the first image element
  }
  
  // Runs when Angular detects changes
  ngDoCheck(): void {
    console.log("DoCheck...")
  }

  
}
