import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-subject',
  standalone: false,
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent implements OnInit
{
  // constructor (private http: HttpClient){}
  private http = inject(HttpClient)

  ngOnInit(): void {
    // create an observable (UNICAST EXAMPLE)
    // Observable constructor needs a callback function passed in,
    // callback function rcvs an 'observer' as its argument
    let obs = new Observable((observer) => {
      observer.next(Math.random()) // on that observer, next() emits a data
      // Math.random() will generate a random number and emit from obs observable
    })

    // SUBSCRIBER 1
    obs.subscribe((data) => console.log("obs SUB 1: ", data))

    // SUBCRIBER 2
    obs.subscribe((data) => console.log("obs SUB 2: ", data))
    
    // notice that the value is different in the console, the obs did not emit the same value to all subscribers
    // Observable is unicast, it does not emit the same to all subscriber
    // *** OBSERVABLES are LAZY, they do not emit values until a subcriber subscribes
    // Each subscription gets its own execution of the Observable's logic



    // create a subject (MULTICAST EXAMPLE)
    const subject = new Subject<number>();

    // SUBSCRIBER 1
    subject.subscribe((data) => console.log("subj SUB 1: ", data))

    // SUBCRIBER 2
    subject.subscribe((data) => console.log("subj SUB 2: ", data))

    subject.next(Math.random());

    // notice that the value is same in the console, subject is multicast, it emit the same to all subscriber
    // Subscriber acts as both Observable and observers
    // Subjects do not store values; they only emit to current subscribers.
    // If you subscribe after next() is called, you will not receive past values.
    // The next(Math.random()) is called after the subscribers are already set up.
    // If you called subject.next() before subscribing, the subscribers would never receive the value, because Subject does not store past values.


    // observable always emits and provides some data
    // Subject can be provider or consumer, it can provide or consume some data

    // example of using subject as a consumer, randomUserApi : https://randomuser.me/api/
    // we are going to make a get request to this api from our application
    const randomUserObs: Observable<object> = this.search()

    randomUserObs.subscribe({
      next: (data: any) => { console.log('randomUserObs data: ', data) },
      error: (err) => console.error('API error: ', err) 
    })
    randomUserObs.subscribe((res) => console.log("randomUserObs data: ", res))
    randomUserObs.subscribe((res) => console.log("randomUserObs data: ", res))

    // subscribe 3 times, the api call request was made 3 times, see in network /api, UNICAST



    // we need subject to multicast the same data to all subscribers
    const randomUserSubject = new Subject(); // subject currently not emitting any value

    // we subscribe to the subject that emits some value
    randomUserSubject.subscribe((res) => console.log("randomUserSubject data: ", res))
    randomUserSubject.subscribe((res) => console.log("randomUserSubject data: ", res))
    randomUserSubject.subscribe((res) => console.log("randomUserSubject data: ", res))

    // subject now consumes the observable's value
    randomUserObs.subscribe(randomUserSubject) 
    // we subscribe to the observable and pass it the subject
    // subject is now being used as a consumer of the value, it does not provide the value, but consumes the value which is the observable that was return from the http request 
    // it consumes the observable, converts into a subject, pass the same data to all its subscribers
    // api call is now made only once

    // subject can be 
    // Observer: It subscribes to an Observable (in this case, randomUserObs).
    // Observable: It emits the received data to all its subscribers.



    // OBSERVABLE VS PROMSIE
    // Promise is eager, it will execute even without subscription
    // promise always return data
    // promise can only emit single value
    const promise = new Promise((resolve, reject) => {
      console.log("promise is called");
      resolve('value: ' + 100);   // only 100 is emitted, a promise can only emit 1 value at a time
      // resolve('value: ' + 200);
      // resolve('value: ' + 300);
      reject('error in promise');
    })

    promise.then((data) => {
      console.log("data logged: ", data);
    })
    .catch((error) => {
      console.log(error)
    })

    // Observer is only called when there's a subscriber
    // observer only return when subsribed
    // observable can emit single or multi value (stream of data)
    const obsExample = new Observable((observer) => {
      console.log("Observable is called");
      observer.next('value: ' + 100);
      observer.next('value: ' + 200);
      observer.next('value: ' + 300);
    })

    obsExample.subscribe((data) => console.log("logged: ", data))
  }

  private baseUrl: string = 'https://randomuser.me/api/'

  protected search(): Observable<object> {
    return this.http.get<object>(this.baseUrl)
  }

}
