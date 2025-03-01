import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ExampleComponent } from './component/example/example.component';
import { FileUploadComponent } from './component/file-upload/file-upload.component';
import { provideHttpClient } from '@angular/common/http';
import { GalleryComponent } from './component/gallery/gallery.component';
import { CreateEmployeeComponent } from './component/create-employee/create-employee.component';
import { ListEmployeeComponent } from './component/list-employee/list-employee.component';
import { UpdateEmployeeComponent } from './component/update-employee/update-employee.component';
import { DetailsEmployeeComponent } from './component/details-employee/details-employee.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MaterialModule } from './module/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouteGuardService } from './service/route-guard.service';
import { DeactiveGuardService } from './service/deactive-guard.service';
import { TestComponent } from './component/test/test.component';
import { DebounceComponent } from './component/debounce/debounce.component';
import { JsonReaderComponent } from './component/json-reader/json-reader.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    FileUploadComponent,
    GalleryComponent,
    CreateEmployeeComponent,
    ListEmployeeComponent,
    UpdateEmployeeComponent,
    DetailsEmployeeComponent,
    TestComponent,
    DebounceComponent,
    JsonReaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule
    // HttpClientModule // deprecated
  ],
  providers: [provideHttpClient(), RouteGuardService, DeactiveGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
