import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createCourse, createStudent } from "../Services/http";

const portalDiv = document.getElementById("portal-root");

const CourseForm = () => {
  const [courseName, setCourseName] = useState(
    "" //If The mode is edit initial data is set to get data from current data
  );
  const [loading, setLoading] = useState(false);

  const validator = () => {
    return !courseName;
  };

  const triggerToast = (message, code = "success") => {
    if (code === "success") {
      toast.success(message, { theme: "colored" });
    } else {
      toast.error(message, { theme: "colored" });
    }
  };

  const savePayload = async () => {
    let payload = {
      name: courseName,
    };

    setLoading(true);
    //Adds a new student
    try {
      let response = await createCourse(payload);
      if (response.status === 201) {
        triggerToast("New Course Added Successfully..", "success");
        setCourseName("");
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
              Create Course
            </div>
            <div className="p-4">
              <div className="flex flex-row justify-between items-center">
                <label className="block text-gray-700 text-sm font-bold w-[20%]">
                  Course Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="courseName"
                  type="text"
                  placeholder="Enter Course Name"
                  value={courseName}
                  onChange={(e) => {
                    setCourseName(e.target.value);
                  }}
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

export default CourseForm;
