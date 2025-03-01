import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  // constructor(httpClient: HttpClient) { } 
  // need to import,
  // put in the providers: provideHttpClient()
  private httpClient = inject(HttpClient)

  //end points from backend are uploadfiles and uploadedfiles
   private fileUrl = 'http://localhost:3000/';

   uploadFile(file: File): Observable<any>
   {
    const formData = new FormData() // header?
    formData.append('file', file)
    return this.httpClient.post(this.fileUrl + 'uploadFile', formData)
   }
   
}
