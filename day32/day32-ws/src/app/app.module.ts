import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoComponent } from './component/todo/todo.component';
import { TaskComponent } from './component/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
