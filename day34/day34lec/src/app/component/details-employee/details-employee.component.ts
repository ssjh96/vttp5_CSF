import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-details-employee',
  standalone: false,
  templateUrl: './details-employee.component.html',
  styleUrl: './details-employee.component.css'
})
export class DetailsEmployeeComponent implements OnInit{
  id!: number;
  employee: any;

  constructor(private employeeSvc: EmployeeService, ){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
