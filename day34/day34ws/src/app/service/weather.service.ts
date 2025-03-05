import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'https://api.weatherapi.com/v1/current.json'

  // ?key=db403e8af1aa4ff296325345240612&q=London&aqi=no

  private apiKey = 'apikey'


  public getWeatherData(city: string): Observable<any>
  {
    const queryParams = new HttpParams()
            .set("key", this.apiKey)
            .set("q", city)
            .set("aqi", "no");
            
    return this.http.get(this.baseUrl, { params: queryParams} )
  }
  
}
