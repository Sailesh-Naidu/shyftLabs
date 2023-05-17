import axios from "axios";

const baseUrl = "http://localhost:8080"; //REPLACE WITH YOUR JAVA ENDPOINT

export const listStudents = async () => {
  return await axios.get(`${baseUrl}/students/list`);
};

export const deleteStudent = async (id) => {
  return await axios.delete(`${baseUrl}/students/${id}`);
};

export const createStudent = async (payload) => {
  const headers = { "Content-Type": "application/json" };

  return await axios.post(`${baseUrl}/students/create`, payload, headers);
};


export const listCourse = async () => {
  return await axios.get(`${baseUrl}/courses/list`);
};

export const deleteCourse = async (id) => {
  return await axios.delete(`${baseUrl}/courses/${id}`);
};

export const createCourse = async (payload) => {
  const headers = { "Content-Type": "application/json" };

  return await axios.post(`${baseUrl}/courses/create`, payload, headers);
};


export const listResult = async () => {
  return await axios.get(`${baseUrl}/results/list`);
};

export const createResult = async (payload) => {
  const headers = { "Content-Type": "application/json" };

  return await axios.post(`${baseUrl}/results/create`, payload, headers);
};
