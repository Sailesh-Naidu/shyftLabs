package com.assignment.model;

import com.assignment.enums.ScoreEnum;

public class ResultModel {
	private int id;
	private int courseId;
	private int studentId;
	private ScoreEnum score;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getCourseId() {
		return courseId;
	}

	public void setCourseId(int courseId) {
		this.courseId = courseId;
	}

	public int getStudentId() {
		return studentId;
	}

	public void setStudentId(int studentId) {
		this.studentId = studentId;
	}

	public ScoreEnum getScore() {
		return score;
	}

	public void setScore(ScoreEnum score) {
		this.score = score;
	}

}
