import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RsvpComponent } from './components/rsvp.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './components/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    RsvpComponent,
    TodoComponent
  ],
  // step 1: imports reactiveformmodule for form usage
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
