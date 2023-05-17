package com.assignment.service;

import java.util.List;

import com.assignment.entity.Course;

public interface CourseService {

	Course createCourse(Course course);

	List<Course> getAllCourses();

	void deleteCourse(int id);
}
