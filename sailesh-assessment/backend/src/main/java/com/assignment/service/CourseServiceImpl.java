package com.assignment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assignment.entity.Course;
import com.assignment.exception.ResourceAlreadyExistsException;
import com.assignment.exception.ResourceNotFoundException;
import com.assignment.repository.CourseRepository;
import com.assignment.repository.ResultRepository;

@Service
public class CourseServiceImpl implements CourseService {
	private final CourseRepository courseRepository;
	private final ResultRepository resultRepository;

	@Autowired
	public CourseServiceImpl(CourseRepository courseRepository, ResultRepository resultRepository) {
		this.courseRepository = courseRepository;
		this.resultRepository = resultRepository;
	}

	@Override
	public Course createCourse(Course course) {
		if (courseRepository.existsByName(course.getName())) {
			throw new ResourceAlreadyExistsException("A course with the same name already exists.");
		}
		return courseRepository.save(course);
	}

	@Override
	public List<Course> getAllCourses() {
		return courseRepository.findAll();
	}

	@Override
	public void deleteCourse(int id) {
		if (!courseRepository.existsById(id)) {
			throw new ResourceNotFoundException(String.format("A course with id '%d' does not exists.", id));
		}
		deleteCourseFromResult(id);
		courseRepository.deleteById(id);
	}

	void deleteCourseFromResult(int id) {
		// Delete associated Result records first
		resultRepository.deleteByCourseId(id);
	}

}
