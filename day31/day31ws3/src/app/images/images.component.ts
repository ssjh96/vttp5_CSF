import { Component } from '@angular/core';

@Component({
  selector: 'app-images',
  standalone: false,
  templateUrl: './images.component.html',
  styleUrl: './images.component.css'
})
export class ImagesComponent 
{
  currentNum = 0; // start from number0.jpg
  maxNum = 30; // largest is number30.jpg

  // Property getter
  public get currentImage() : string {
    return `numbers/number${this.currentNum}.jpg`; // Path to the image file
  }

  nextImage()
  {
    if (this.currentNum < this.maxNum)
    {
      this.currentNum++; // Increment currentNum
    }
  }

  previousImage()
  {
    if(this.currentNum > 0)
    {
      this.currentNum--;
    }
  }
  
}
