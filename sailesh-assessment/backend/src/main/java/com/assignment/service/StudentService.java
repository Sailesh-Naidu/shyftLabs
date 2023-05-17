package com.assignment.service;

import java.util.List;

import com.assignment.entity.Student;

public interface StudentService {
	Student createStudent(Student student);

	List<Student> getAllStudents();

	void deleteStudent(int id);
}
