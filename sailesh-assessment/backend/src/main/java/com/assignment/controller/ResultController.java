package com.assignment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.entity.Result;
import com.assignment.model.ResultModel;
import com.assignment.service.ResultService;

@RestController
@RequestMapping("/results")
@CrossOrigin(origins = "http://localhost:3000")
public class ResultController {

	private final ResultService resultService;

	@Autowired
	public ResultController(ResultService resultService) {
		this.resultService = resultService;
	}

	@PostMapping("/create")
	public ResponseEntity<Result> saveResult(@RequestBody ResultModel resultModel) {
		Result savedResult = resultService.saveResult(resultModel);
		return new ResponseEntity<>(savedResult, HttpStatus.CREATED);
	}

	@GetMapping("/list")
	public ResponseEntity<List<Result>> getAllResults() {
		List<Result> results = resultService.getAllResults();
		return new ResponseEntity<>(results, HttpStatus.OK);
	}
}
