import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class FakeryService {

  constructor(private httpClient: HttpClient) { }

  private fakeryUrl = "https://jsonfakery.com/photos"

  // getFakeryPhotos(): Promise<void> {
  //   try {
  //     const photos = axios.get(this.fakeryUrl) // get returns promise
  //     return photos.data;
  //   } catch (error) {
  //     console.error(error)
  //     // throw error; // can throw but client side need a handler to handle?
  //   }
    // 
  // }
}
