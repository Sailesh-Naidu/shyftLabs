package com.assignment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.assignment.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Integer> {
	boolean existsByName(String name);
}
