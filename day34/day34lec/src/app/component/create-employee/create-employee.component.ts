import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../service/employee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-employee',
  standalone: false,
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent implements OnInit {
  form!: FormGroup;
  employee!: Employee;
  // router!: Router

  // need to inject router?
  constructor(private employeeSvc: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      emailId: new FormControl('')
    });
  }

  postEmployee() {
    console.log('Form Post');

    this.employee = this.form.value;
    console.log(this.employee);

    this.saveEmployee();
    this.router.navigate(['employeeList'])
  }

  saveEmployee() {
    this.employeeSvc.create(this.employee).subscribe(
      (data) => {
        console.log('Employee Saved');
      });
  }
}
