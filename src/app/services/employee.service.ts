import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseURL: string = "http://localhost:3000";
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  addEmployee(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/employees`, data);
  }

  getEmployee(): Observable<any> {
    return this.http.get(`${this.baseURL}/employees`);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/employees/${id}`);
  }

  updateEmployee(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseURL}/employees/${id}`, data);
  }

  openSnackBar(message: any, action: any = 'ok') {
    this._snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'bottom'
    });
  }
}
