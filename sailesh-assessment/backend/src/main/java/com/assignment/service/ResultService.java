package com.assignment.service;

import java.util.List;

import com.assignment.entity.Result;
import com.assignment.model.ResultModel;

public interface ResultService {
	Result saveResult(ResultModel resultModel);

	List<Result> getAllResults();

}
