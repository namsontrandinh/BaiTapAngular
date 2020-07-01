import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateEmployeeComponent } from './../create-employee/create-employee.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
// import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { EmployeeService } from "../employee.service";
import { Employee } from "../employee";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  userFormGroup: FormGroup;
  employees: Employee[];
  objectFilter: Employee = new Employee();

  constructor(private employeeService: EmployeeService,
    private router: Router, private formBuilder: FormBuilder) {
    this.createForm();
  }

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

  createForm() {
    this.userFormGroup = this.formBuilder.group({
      employee_name: ['', Validators.required],
      employee_salary: ['', Validators.required],
      employee_age: ['', Validators.required],
    });
  }

  filter = {
    employee_name: 'Dang Van Tuan',
    employee_age: '29'
  };

  onSubmit() {
    this.employees= this.employees.filter(function(item) {
      for (var key in this.filter) {
        if (item[key] === undefined || item[key] != this.filter[key])
          return false;
      }
      return true;
    });
  }
}
