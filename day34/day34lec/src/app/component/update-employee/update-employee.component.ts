import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../service/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  standalone: false,
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit
{
  form!: FormGroup
  employee: Employee = new Employee();
  id!: number;

  constructor(private employeeSvc: EmployeeService, private route: ActivatedRoute, private router: Router) { } // activated route? router? 

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      emailId: new FormControl('')
    });

    this.id = this.route.snapshot.params['id'];
    this.employeeSvc.getById(this.id).subscribe((data: any) => {
      this.employee = data;
      this.form.patchValue(this.employee);
    }, (error: any) => console.log(error));
  }

  updateEmployee() {
    this.employeeSvc.updateById(this.id, this.form.value).subscribe((data: any) => {
      this.router.navigate(['/employeeList']);
    },
      (error: any) => console.log(error));
  }

}
