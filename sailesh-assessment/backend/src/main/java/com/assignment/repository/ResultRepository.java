package com.assignment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.assignment.entity.Result;

import jakarta.transaction.Transactional;

@Repository
public interface ResultRepository extends JpaRepository<Result, Integer> {

	@Transactional
	@Modifying
	@Query("DELETE FROM Result r WHERE r.course.id = :courseId")
	void deleteByCourseId(Integer courseId);
	

	@Transactional
	@Modifying
	@Query("DELETE FROM Result r WHERE r.student.id = :studentId")
	void deleteByStudentId(Integer studentId);
}