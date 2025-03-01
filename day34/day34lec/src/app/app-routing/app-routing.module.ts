import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeeComponent } from '../component/list-employee/list-employee.component';
import { CreateEmployeeComponent } from '../component/create-employee/create-employee.component';
import { DetailsEmployeeComponent } from '../component/details-employee/details-employee.component';
import { ExampleComponent } from '../component/example/example.component';
import { UpdateEmployeeComponent } from '../component/update-employee/update-employee.component';
import { RouteGuardService } from '../service/route-guard.service';
import { TestComponent } from '../component/test/test.component';
import { DeactiveGuardService } from '../service/deactive-guard.service';
import { DebounceComponent } from '../component/debounce/debounce.component';
import { JsonReaderComponent } from '../component/json-reader/json-reader.component';

// you only add top level component to the route
const routes: Routes = [
  {path: 'employeeList', component: ListEmployeeComponent}, // /employeeList will go to the ListEmployeeComponent
  {path: 'employeeCreate', component: CreateEmployeeComponent},
  {path: 'employeeDetails/:id', component: DetailsEmployeeComponent},
  {path: 'employeeUpdate/:id', component: UpdateEmployeeComponent, canActivate: [RouteGuardService]}, // :id is passed in variable, 
  {path: 'example', component: ExampleComponent},
  {path: 'test', component: TestComponent, canDeactivate: [DeactiveGuardService]},
  {path: 'debounce', component: DebounceComponent},
  {path: 'jsonReader', component: JsonReaderComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full'} // lead to custom 404 error page
];

@NgModule({
  declarations: [],
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
