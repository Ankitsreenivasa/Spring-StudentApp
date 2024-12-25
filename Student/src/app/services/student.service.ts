import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${student.id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { responseType: 'text' as 'json' });
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  findStudentsByAgeGreaterThan(age: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/age/${age}`);
  }

  findStudentsByDepartmentAndSection(department?: string, section?: string): Observable<Student[]> {
    let params: any = {};
    if (department) params.department = department;
    if (section) params.section = section;
    return this.http.get<Student[]>(`${this.apiUrl}/search`, { params });
  }
}
