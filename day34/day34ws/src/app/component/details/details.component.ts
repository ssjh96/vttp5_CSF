import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../../service/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent 
{
  weatherForm!: FormGroup
  city!: string

  weatherData$ !: Subscription
  resultData: Map<string, string> = new Map()

  constructor(private fb: FormBuilder, private weatherSvc: WeatherService)
  {
    this.weatherForm = fb.group({
      city: fb.control<string>('', [Validators.required])
    })
  }
  

  protected processForm()
  {
    const formData = this.weatherForm.value
    // this.city = this.weatherForm.value.city
    this.city = this.weatherForm.get("city")?.value
    console.log("city: ", this.city)


    // this.weatherData$ = this.weatherSvc.getWeatherData(this.city).subscribe({
    //   next: (data) => { console.log("data: ", data) },
    //   error: (err) => {alert(err.message)}
    // })

    this.weatherData$ = this.weatherSvc.getWeatherData(this.city).subscribe(
      (data) => { 
        console.log("data: ", data) // data is a json obj
        console.log("data value: ", data.location.name) 
        // location is key, name is subkey in location

        const cityName = data.location.name
        const countryName =  data.location.country
        const temp = data.current.temp_c
        const feelsLikeTemp = data.current.feelslike_c

        this.resultData.set("city", cityName)
                        .set("country", countryName)
                        .set("temperature", temp)
                        .set("feelsLike", feelsLikeTemp)
      });
  }



  // VALIDATIONS
  protected touchedAndInvalid(ctrlName: string): boolean
  {
    const ctrl = this.weatherForm.get(ctrlName) as FormControl
    return ctrl.touched && ctrl.invalid
  }

  protected isValid(ctrlName: string): boolean
  {
    return !!this.weatherForm.get(ctrlName)?.valid
  }
}
