import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crud-operation';

  displayedColumns: Array<string> = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService
  ) { }

  openAddEditEmp(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(EmpAddEditComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.getEmployeeList();
    });
  }

  getEmployeeList() {
    this.employeeService.getEmployee().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: string, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.employeeService.deleteEmployee(id).subscribe(
      {
        next: (data: any) => {
          console.log(data);
          this.employeeService.openSnackBar('Employ deleted', 'Done');
          this.getEmployeeList();
        }
      }
    );
  }

  editEmployee(data: any, enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(EmpAddEditComponent, {
      data,
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.getEmployeeList();
    });
  }

  ngOnInit(): void {
    this.getEmployeeList();
  }
}
