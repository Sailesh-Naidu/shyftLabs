import React, { useEffect, useState } from "react";
import {
  tableCourseHeaders,
  tableHeaders,
  tableResultsHeaders,
} from "../Utils/data";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import CourseForm from "./CourseForm";
import { Table } from "../Reusable/ReusableTable";
import { useNavigate } from "react-router-dom";
import { deleteResult, listResult } from "../Services/http";

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const triggerToast = (message, code = "success") => {
    if (code === "success") {
      toast.success(message, { theme: "colored" });
    } else {
      toast.error(message, { theme: "colored" });
    }
  };

  const flattenArr = () => {
    let arr = [];
    results.forEach((res, index) => {
      const { student, course, score, id } = res;
      let obj = {
        id,
        studentName: student.firstName + " " + student.lastName,
        courseName: course.name,
        score,
      };
      arr.push(obj);
    });
    return arr;
  };

  const fetchResults = async () => {
    try {
      let response = await listResult();
      if (response.status === 200) {
        setResults(response.data);
        setLoading(false);
      }
    } catch (e) {
      triggerToast("Something went wrong :(", "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    async function init() {
      await fetchResults();
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
            <div className="text-xl font-bold">Results</div>
            <button
              className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded h-10 ml-auto"
              onClick={() => {
                navigate("/results-add");
              }}
            >
              Create Result
            </button>
          </div>
          {results.length ? (
            <Table
              fieldsMap={["courseName", "studentName", "score"]}
              tableHeaders={tableResultsHeaders}
              showButtons={false}
              tableData={flattenArr()}
            ></Table>
          ) : (
            <div className="text-base font-medium text-red-600 mt-4">
              No Result Found Please add a Result from "Create Result" button
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Results;
