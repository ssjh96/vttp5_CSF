import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounce, debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-debounce',
  standalone: false,
  templateUrl: './debounce.component.html',
  styleUrl: './debounce.component.css'
})
export class DebounceComponent implements OnInit, OnDestroy {

  // what does the <any> do?
  myForm: FormGroup<any> = new FormGroup<any> ({ 
    name: new FormControl('')
  })

  subscription!: Subscription; // subscription is an observable

  ngOnInit(): void {
    this.subscription = this.myForm.valueChanges.pipe(debounceTime(3000))
      .subscribe(value => {
        console.log(value);
      }); // when i change smth the subscription observe it?
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // this is to release resources
  }
  

}
