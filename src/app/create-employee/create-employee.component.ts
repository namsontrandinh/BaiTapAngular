import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
    selector: 'app-create-employee',
    templateUrl: './create-employee.component.html',
    styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
    userFormGroup: FormGroup;
    employee: Employee = new Employee();
    submitted = false;

    constructor(private employeeService: EmployeeService,
        private router: Router, private formBuilder: FormBuilder) {
        this.createForm();
    }

    ngOnInit(): void {
    }

    createForm() {
        this.userFormGroup = this.formBuilder.group({
            employee_name: ['', Validators.required],
            employee_salary: ['', Validators.required],
            employee_age: ['', Validators.required],
        });
    }

    newEmployee(): void {
        this.submitted = false;
        this.employee = new Employee();
    }

    save() {
        this.employeeService.createEmployee(this.employee).subscribe(
            (data) => { console.log(data) },
            error => console.log(error)
        );
        this.employee = new Employee();
        this.gotoList();
    }

    onSubmit() {
        this.submitted = true;
        this.save();
    }

    gotoList() {
        this.router.navigate(['/employees']);
    }
}
