package com.assignment.model;

public class SuccessResponse {
	private String message;
	private Object data;

	public SuccessResponse(String message, Object data) {
		this.message = message;
		this.data = data;
	}

	public SuccessResponse(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getdata() {
		return data;
	}

	public void setdata(Object data) {
		this.data = data;
	}

}
