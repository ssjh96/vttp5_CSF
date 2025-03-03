import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-change-detection',
  standalone: false,
  templateUrl: './change-detection.component.html',
  styleUrl: './change-detection.component.css'
})
export class ChangeDetectionComponent implements OnChanges
{
  // 'data' is passed in from the parent component via attribute binding: [data]="numbers"
  @Input() data: number[] = [];

  // 'counter' is passed in from the parent component via attribute binding: [counter]="counter"
  @Input() counter: number = 0;

   /**
   * The OnChanges lifecycle hook is triggered whenever
   * an @Input() property changes (i.e., when Angular detects
   * a new value or a new reference for 'data').
   */
  ngOnChanges(changes: SimpleChanges): void 
  {
    
    if (changes['data']) {
      console.log('ngOnChanges: data changed', changes['data']);
    }

    if (changes['counter']) {
      console.log('ngOnChanges: counter changed', changes['counter']);
    }
  }
}
