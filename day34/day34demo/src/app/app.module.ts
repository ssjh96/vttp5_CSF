import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewTaskComponent } from './component/new-task/new-task.component';
import { ShowTaskComponent } from './component/show-task/show-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubjectComponent } from './component/subject/subject.component';
import { provideHttpClient } from '@angular/common/http';
import { UnsubscribeComponent } from './component/unsubscribe/unsubscribe.component';

@NgModule({
  declarations: [
    AppComponent,
    NewTaskComponent,
    ShowTaskComponent,
    SubjectComponent,
    UnsubscribeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
