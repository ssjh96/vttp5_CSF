import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { Employee } from '../../model/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employee',
  standalone: false,
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.css'
})
export class ListEmployeeComponent implements OnInit
{

  employees: any;
  constructor(private employeeSvc: EmployeeService, private router: Router){}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeSvc.getAll().subscribe((data: Employee[]) => {
      this.employees = data;
    });
    //left is value you want to pass to function, inside curly bracket is function you want to perform
  }

  deleteEmployee(id: number) {
    this.employeeSvc.deleteById(id).subscribe((data: any) => {
      this.getEmployees();
    });
  }

  updateEmployee(id: number) {
    this.router.navigate(['employeeUpdate', id])
  }
}
