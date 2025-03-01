import { Component, inject, OnInit } from '@angular/core';
// import { FakeryService } from '../../service/fakery.service';

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit
{
  photos: any[] = [];
  // constructor(private fakerySvc: FakeryService) { }
  // private fakerySvc = inject(FakeryService)

  ngOnInit(): void 
  {
    // this.fakerySvc.getFakeryPhotos()?.then((photo) => {this.photos.push(p)
    
  }


}
