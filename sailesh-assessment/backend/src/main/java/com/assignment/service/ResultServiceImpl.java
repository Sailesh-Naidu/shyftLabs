package com.assignment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assignment.entity.Course;
import com.assignment.entity.Result;
import com.assignment.entity.Student;
import com.assignment.model.ResultModel;
import com.assignment.repository.ResultRepository;

@Service
public class ResultServiceImpl implements ResultService {
	private final ResultRepository resultRepository;

	@Autowired
	public ResultServiceImpl(ResultRepository resultRepository) {
		this.resultRepository = resultRepository;
	}

	@Override
	public List<Result> getAllResults() {
		return resultRepository.findAll();
	}

	@Override
	public Result saveResult(ResultModel resultModel) {

		Course course = new Course();
		course.setId(resultModel.getCourseId());

		Student student = new Student();
		student.setId(resultModel.getStudentId());

		Result result = new Result();
		result.setScore(resultModel.getScore());
		result.setCourse(course);
		result.setStudent(student);
		return resultRepository.save(result);
	}
}
