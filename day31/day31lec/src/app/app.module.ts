import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // no / or ./, comes from node_modules

import { AppComponent } from './app.component'; // comes from directories
import { TextComponent } from './components/text.component';
import { TextInputComponent } from './components/text-input.component'; // comes from directories

@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
    TextInputComponent
  ],
  imports: [
    BrowserModule
  ],
  // exports:[ AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
