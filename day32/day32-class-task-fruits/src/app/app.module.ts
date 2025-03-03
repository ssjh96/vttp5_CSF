import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InventoryComponent } from './component/inventory/inventory.component';
import { CartComponent } from './component/cart/cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    CartComponent
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule, 
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
