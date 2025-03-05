import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'https://api.weatherapi.com/v1/current.json'

  // ?key=apikey&q=London&aqi=no

  private apiKey = 'apiKey'


  public getWeatherData(city: string): Observable<any>
  {
    const queryParams = new HttpParams()
            .set("key", this.apiKey)
            .set("q", city)
            .set("aqi", "no");
            
    return this.http.get(this.baseUrl, { params: queryParams} )
  }
  
}
