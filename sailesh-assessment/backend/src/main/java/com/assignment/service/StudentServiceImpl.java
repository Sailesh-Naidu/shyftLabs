package com.assignment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assignment.entity.Student;
import com.assignment.exception.ResourceAlreadyExistsException;
import com.assignment.exception.ResourceNotFoundException;
import com.assignment.repository.CourseRepository;
import com.assignment.repository.ResultRepository;
import com.assignment.repository.StudentRepository;

@Service
public class StudentServiceImpl implements StudentService {
	private final StudentRepository studentRepository;
	private final ResultRepository resultRepository;

	@Autowired
	public StudentServiceImpl(StudentRepository studentRepository, ResultRepository resultRepository) {
		this.studentRepository = studentRepository;
		this.resultRepository = resultRepository;
	}

	@Override
	public Student createStudent(Student student) {
		// Check if a user with the same email already exists
		if (studentRepository.existsByEmail(student.getEmail())) {
			throw new ResourceAlreadyExistsException("A user with the same email already exists.");
		}
		return studentRepository.save(student);
	}

	@Override
	public List<Student> getAllStudents() {
		return studentRepository.findAll();
	}

	@Override
	public void deleteStudent(int id) {
		if (!studentRepository.existsById(id)) {
			throw new ResourceNotFoundException(String.format("A student with id '%d' does not exists.", id));
		}
		deleteStudentFromResult(id);
		studentRepository.deleteById(id);
	}

	void deleteStudentFromResult(int id) {
		// Delete associated Result records first
		resultRepository.deleteByStudentId(id);
	}
}
