import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { filter, from, fromEvent, map, Observable, of, Subscription } from 'rxjs';
// each in rxjs is a method/function, we need to pass callback function as arg

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit{
 
  title = 'day34demo';

  dataList: any[] = [];

  // create an observable
  // observer is nth but the subscriber
  // observer is going to receive the subscribers that subcribe to myObservable
  myObservable = new Observable((observer) => {
    // next() method to emit some values,
    // observer.next([1, 2, 3, 4, 5]) // this returns a single data: an array 

    // streaming the data
    setTimeout(() => { observer.next(1) }, 1000);
    setTimeout(() => { observer.next(2) }, 2000);
    setTimeout(() => { observer.next(3) }, 3000);

    // Error singal
    // setTimeout(() => { observer.error(new Error('Something went wrong. Please try again later')) }, 3000);

    // After error occured, an observable cannot emit any other value
    setTimeout(() => { observer.next(4) }, 4000);
    setTimeout(() => { observer.next(5) }, 5000);

    // Complete signal
    setTimeout(() => { observer.complete() }, 3000); // after complete signal emitted, we cannot emit any other value from the observable

    // observer.next(1);
    // observer.next(2);
    // observer.next(3);
    // observer.next(4);
    // observer.next(5);
    
  })

  protected getAsyncData()
  {
    // Observer - whenever new data is emitted by myobservable, observer is notified of it
    // next, error, complete ( CALL BACK FUNCTIONS )
    // this.myObservable.subscribe((val: any) => {this.dataList = val});
    this.myObservable.subscribe({ // observer/subscriber
      // next: (val: any) => {this.dataList = val}
      
      // stream example
      next: (val: any) => { this.dataList.push(val) }, // this is the handler
      error: (err) => { alert(err.message)},
      complete: () => { alert(' All data streamed')}

    })
  }



  // CREATE OBSERVABLE WITH OF OPERATOR
  array1 = [1, 3, 5, 7, 9]
  array2 = ['A', 'B', 'C', 'D']

  // of() creates an obserable from the args
  // can pass any number of arguments to of() operator
  // once each is emitted one after the other, it sends the complete signal at the end
  myObservable2 = of(this.array1, this.array2, 20, 30, "hello", true) 


  protected getAsyncData2()
  {
    this.myObservable2.subscribe({ // observer/subscriber
      
      // stream example
      next: (val: any) => { 
        this.dataList.push(val); 
        console.log("val: ", val);
        console.log("dataList: ", this.dataList)
      }, // this is the handler
      error: (err) => { alert(err.message)},
      complete: () => { alert(' All data streamed for OF operator')}

    })
  }



  // CREATE OBSERVABLE WITH FROM OPERATOR

  // from operator takes a single arg that can be iterated over and converts it into an observable and return (string, array)

  // DATA PASSED INTO FROM MUST BE ITERABLE ***
  array3 = [2, 4, 6, 8, 10, 12]
  name = "sheryl"

  // of() creates an obserable from the args
  // can pass any number of arguments to of() operator
  // once each is emitted one after the other, it sends the complete signal at the end
  // myObservable3 = from(this.array3) 
  myObservable3 = from(this.name) 


  protected getAsyncData3()
  {
    this.myObservable3.subscribe({ // observer/subscriber
      
      // stream example
      next: (val: any) => { 
        this.dataList.push(val); 
        console.log("val: ", val);
        console.log("dataList: ", this.dataList)
      }, // this is the handler
      error: (err) => { alert(err.message)},
      complete: () => { alert(' All data streamed for FROM operator')}

    })
  }


  // FROM OPERATOR is the best way to convert promise to observable
  promiseData = new Promise((resolve, reject) => {
    resolve([10, 20, 30, 40, 50]); // resolve promise and emit an array
    reject('error');
  })

  myConvertedObservable = from(this.promiseData) // this promiseData is converted into an observable

  protected getAsyncData4()
  {
    this.myConvertedObservable.subscribe({ // observer/subscriber
      
      // stream example
      next: (val: any) => { 
        this.dataList.push(val); 
        console.log("val: ", val);
        console.log("dataList: ", this.dataList)
      }, // this is the handler
      error: (err) => { alert(err.message)},
      complete: () => { alert(' All data streamed for CONVERSION')}

    })
  }


  // CREATE BUTTON - 
  // Creates observable from event
  // every time clicked, an observable will be created, and we are subscribing to that observable
  @ViewChild('createBtn')
  createBtn!: ElementRef 

  createBtnObs!: Subscription;

  buttonClicked()
  {
    // javascript?
    let count = 0;
    // fromEvent creates an observable from the click method
    // nativeElement gets the whole target element: <button #createBtn>Create Item</button>
    // 'click' is the DOM event
    this.createBtnObs = fromEvent(this.createBtn.nativeElement, 'click').subscribe({
      next: (data) => { 
        console.log("data: ", data);
        // this.showItem(count++);  // post increment operator
        this.showItem(++count);     // pre increment operator - count starts from 1
      },
      error: (err) => { alert(err.message)},
      complete: () => { alert('FromEvent Complete')}
    });
  }

  ngAfterViewInit(): void {
    this.buttonClicked();
  }

  showItem(val: number){
    let div = document.createElement('div');
    div.innerText = 'Item ' + val;
    div.className = 'mb-3';
    document.getElementById('divId')?.appendChild(div);
  }


  // MAP AND FILTER EXAMPLES
  // pipe can change multiple methods, separate by commas, order is impt
  mfObs = from(this.array3)

  // MAP TRANSFORMS 
  transformedObs = this.mfObs.pipe(map(val => {
    return val * 5;
  }))

  protected getAsyncData5()
  {
    this.transformedObs.subscribe({ // observer/subscriber
      
      // stream example
      next: (val: any) => { 
        this.dataList.push(val); 
        console.log("val: ", val);
        console.log("dataList: ", this.dataList)
      }, // this is the handler
      error: (err) => { alert(err.message)},
      complete: () => { alert(' All data transformed for MAP')}

    })
  }

  // FILTER OPERATOR - filter data from source observable given a condn
  // emits 20, 40, 60
  filteredObs = this.transformedObs.pipe(filter(val => {
    return val % 4 === 0; // boolean condition, if result of val/4 is 0, we want to return that value/emit that value from this new obs
  }))
  
  protected getAsyncData6()
  {
    this.filteredObs.subscribe({ // observer/subscriber
      
      // stream example
      next: (val: any) => { 
        this.dataList.push(val); 
        console.log("val: ", val);
        console.log("dataList: ", this.dataList)
      }, // this is the handler
      error: (err) => { alert(err.message)},
      complete: () => { alert(' All data transformed for MAP')}

    })
  }
}
