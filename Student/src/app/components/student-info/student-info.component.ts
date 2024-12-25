import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-info',
  imports: [CommonModule, FormsModule],
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {
  showCreateForm = false;
  showEditForm = false;
  showAlert = false; // Flag to control the visibility of the alert
  departments = ['CSE', 'ISE', 'ECE', 'EEE'];
  sections = ['A', 'B', 'C', 'D'];
  students: Student[] = [];
  newStudent: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    age: 0,
    department: '',
    section: ''
  };
  selectedStudent: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    age: 0,
    department: '',
    section: ''
  };

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe((students) => {
      this.students = students;
    });
  }

  createStudent(): void {
    this.studentService.addStudent(this.newStudent).subscribe(() => {
      this.newStudent = {
        id: 0,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        age: 0,
        department: '',
        section: ''
      };
      this.showCreateForm = false;
      this.showAlert = true; // Show the alert
      setTimeout(() => this.showAlert = false, 3000); // Hide the alert after 3 seconds
      this.getStudents(); // Refresh the student list
    });
  }

  editStudent(student: Student): void {
    this.selectedStudent = { ...student };
    this.showEditForm = true;
    this.showCreateForm = false;
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
      this.showAlert = true; // Show the alert
      setTimeout(() => this.showAlert = false, 3000); // Hide the alert after 3 seconds
      this.getStudents(); // Refresh the student list
    });
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.getStudents(); // Refresh the student list
    });
  }

  resetForm(): void {
    this.newStudent = {
      id: 0,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      age: 0,
      department: '',
      section: ''
    };
    this.showCreateForm = false;
  }
}
