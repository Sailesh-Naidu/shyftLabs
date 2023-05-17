import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../App.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createResult, listCourse, listStudents } from "../Services/http";

const gradeList = ["A", "B", "C", "D", "E", "F"];

const ResultForm = () => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [grade, setGrade] = useState("");

  const [studentList, setStudentList] = useState([]);
  const [courseList, setCourseList] = useState([]);

  const [loading, setLoading] = useState(true);

  const validator = () => {
    return !selectedStudent?.value || !selectedCourse?.value || !grade?.value;
  };

  const triggerToast = (message, code = "success") => {
    if (code === "success") {
      toast.success(message, { theme: "colored" });
    } else {
      toast.error(message, { theme: "colored" });
    }
  };

  const dropdownFormatter = (options, type) => {
    let arr = [];
    options.forEach((res, index) => {
      if (type === "student") {
        const { firstName, lastName, id } = res;
        let obj = {
          value: id,
          label: firstName + " " + lastName,
        };
        arr.push(obj);
      } else {
        const { name, id } = res;
        let obj = {
          value: id,
          label: name,
        };
        arr.push(obj);
      }
    });
    return arr;
  };

  const savePayload = async () => {
    let payload = {
      studentId: selectedStudent?.value,
      courseId: selectedCourse?.value,
      score: grade?.value,
    };

    setLoading(true);
    //Adds a new student
    try {
      let response = await createResult(payload);
      if (response.status === 201) {
        triggerToast("New Result Created Successfully..", "success");
        setSelectedCourse("")
        setSelectedStudent("")
        setGrade("")
        setLoading(false);
      }
    } catch (e) {
      triggerToast(
        e.response?.data?.message || "Something went wrong :( !!",
        "error"
      );
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      let response1 = await listCourse();
      let response2 = await listStudents();
      if (response1.status === 200 && response2.status === 200) {
        setCourseList(response1.data);
        setStudentList(response2.data);
        setLoading(false);
      }
    } catch (e) {
      triggerToast("Something went wrong :(", "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    async function init() {
      await fetchData();
    }
    init();
  }, []);


  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
    <div className="form-container">

      <div className="flex flex-col w-full">
        <div className="divide-y divide-grey-300 text-lg font-bold border px-4 py-2 bg-gray-100">
          Add Result
        </div>
        <div className="p-4">
          <div className="flex flex-row mb-4 justify-between items-center">
            <label className="block text-gray-700 text-sm font-bold w-[20%]">
              Course Name
            </label>
            <Dropdown
              onChange={(val) => {
                setSelectedCourse(val);
              }}
              options={dropdownFormatter(courseList, "course")}
              value={selectedCourse}
              placeholder="Select a Course"
              className="rounded w-[80%] "
            />
          </div>
          <div className="flex flex-row mb-4 justify-between items-center">
            <label className="block text-gray-700 text-sm font-bold w-[20%]">
              Student Name
            </label>
            <Dropdown
              onChange={(val) => {
                setSelectedStudent(val);
              }}
              options={dropdownFormatter(studentList, "student")}
              value={selectedStudent}
              placeholder="Select a Student"
              className="rounded w-[80%] "
            />
          </div>
          <div className="flex flex-row mb-4 justify-between items-center">
            <label className="block text-gray-700 text-sm font-bold w-[20%]">
              Grade
            </label>
            <Dropdown
              onChange={(val) => {
                setGrade(val);
              }}
              options={gradeList}
              value={grade}
              placeholder="Select a Grade"
              className="rounded w-[80%]"
            />
          </div>
          <button
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold mt-6 py-2 px-4 rounded h-10 float-right w-80  ${
              validator() &&
              "disabled:opacity-50 cursor-not-allowed pointer-events-none"
            }`}
            onClick={savePayload}
            disabled={validator()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )}
  </>
);
};

export default ResultForm;
