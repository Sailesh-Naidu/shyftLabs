import React, { useEffect, useState } from "react";
import { tableCourseHeaders, tableHeaders } from "../Utils/data";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import CourseForm from "./CourseForm";
import { Table } from "../Reusable/ReusableTable";
import { useNavigate } from "react-router-dom";
import { deleteCourse, listCourse } from "../Services/http";

function Course() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const triggerToast = (message, code = "success") => {
    if (code === "success") {
      toast.success(message, { theme: "colored" });
    } else {
      toast.error(message, { theme: "colored" });
    }
  };

  const deleteCourseFunction = async (id) => {
    setLoading(true);
    try {
      let response = await deleteCourse(id);
      if (response.status === 204) {
        triggerToast("Course deleted successfully!!", "success");
        await fetchCourses();
      }
    } catch (e) {
      setLoading(false);
      triggerToast("Something went wrong :(", "error");
    }
  };

  const fetchCourses = async () => {
    try {
      let response = await listCourse();
      if (response.status === 200) {
        setCourses(response.data);
        setLoading(false);
      }
    } catch (e) {
      triggerToast("Something went wrong :(", "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    async function init() {
      await fetchCourses();
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
        <div className="flex flex-col w-full p-10 page-container">
          <div className="flex flex-row">
            <div className="text-xl font-bold">Courses</div>
            <button
              className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded h-10 ml-auto"
              onClick={() => {
                navigate("/courses-add");
              }}
            >
              Create Course
            </button>
          </div>

          {courses.length ? (
            <Table
              fieldsMap={["name"]}
              tableHeaders={tableCourseHeaders}
              showButtons
              tableData={courses}
              deleteFunction={deleteCourseFunction}
            ></Table>
          ) : (
            <div className="text-base font-medium text-red-600 mt-4">
              No Course Found Please add a Course from "Create Course" button
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default Course;
