import { EmployeeService } from './../employee.service';
import { Employee } from './../employee';
import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit {
  employee$: Observable<Employee[]>;
  private seachedSubject = new Subject<String>();

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employee$ = this.seachedSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((seachedString:string)=>this.employeeService.searchEmployee(seachedString))
    );
  }

  search(searchedString: string): void {
    console.log(`searchedString=${searchedString}`);
    this.seachedSubject.next(searchedString);
  }
}
