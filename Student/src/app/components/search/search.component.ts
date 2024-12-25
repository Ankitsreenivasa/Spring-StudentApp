import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-search-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  departments = ['CSE', 'ISE', 'ECE', 'EEE'];
  sections = ['A', 'B', 'C', 'D'];
  selectedDepartment = '';
  selectedSection = '';
  students: Student[] = [];
  showEditForm = false;
  selectedStudent: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    age: 0,
    department: '',
    section: ''
  };

  constructor(private router: Router, private studentService: StudentService) {}

  onSearch() {
    // Fetch students based on the selected department and section
    this.studentService.findStudentsByDepartmentAndSection(this.selectedDepartment, this.selectedSection).subscribe((students) => {
      this.students = students;
    });
  }

  editStudent(student: Student): void {
    this.selectedStudent = { ...student };
    this.showEditForm = true;
  }

  updateStudent(): void {
    this.studentService.updateStudent(this.selectedStudent).subscribe(() => {
      this.selectedStudent = {
        id: 0,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        age: 0,
        department: '',
        section: ''
      };
      this.showEditForm = false;
      this.onSearch();
    });
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.onSearch();
    }, error => {
      console.error('Error deleting student:', error);
      this.onSearch(); // Refresh the student list even if there is an error
    });
  }
}
