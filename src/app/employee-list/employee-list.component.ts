import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs";

import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { EmployeeService } from "../employee.service";
import { Employee } from "../employee";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];

  constructor(private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.employeeService.getEmployeesList().subscribe(
      (data) => {
        this.employees = data;
      }
    );
  }

  deleteEmployee(id) {
    this.employeeService.deleteEmployee(id).subscribe(
      (data) => {
        console.log("xóa thành công");
        this.reloadData();
      }
    );
  }

  employeeUpdate(id: number) {
    this.router.navigate(['update', id]);
  }
}
