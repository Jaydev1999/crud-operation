import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  employeeForm: FormGroup;

  educations: Array<string> = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(private employeeService: EmployeeService, public dialogRef: MatDialogRef<EmpAddEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.employeeForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      dob: new FormControl(),
      gender: new FormControl(),
      education: new FormControl(),
      company: new FormControl(),
      experience: new FormControl(),
      package: new FormControl(),
    });
  }

  formSubmit() {
    const formValue = this.employeeForm.value;
    if (this.data) {
      this.employeeService.updateEmployee(this.data.id, formValue).subscribe({
        next: (val) => {
          console.log(val);
          this.employeeService.openSnackBar('Employ detail updated', 'Done');
          this.dialogRef.close(true);
        }
      });
    } else {
      this.employeeService.addEmployee(formValue).subscribe({
        next: (val) => {
          this.employeeService.openSnackBar('Employ added successfully', 'Done');
          console.log(val);
          this.dialogRef.close(true);
        }
      });
    }
  }

  ngOnInit(): void {
    this.employeeForm.patchValue(this.data);
  }

}
