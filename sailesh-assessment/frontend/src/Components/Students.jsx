import React, { useEffect, useState } from "react";
import { Table } from "../Reusable/ReusableTable";
import { tableHeaders } from "../Utils/data";
import StudentForm from "./StudentForm";
import { deleteStudent, listStudents } from "../Services/http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import { useNavigate } from "react-router-dom";

function StudentsComponent() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const triggerToast = (message, code = "success") => {
    if (code === "success") {
      toast.success(message, { theme: "colored" });
    } else {
      toast.error(message, { theme: "colored" });
    }
  };


  const deleteStudentFunction = async (id) => {
    setLoading(true);
    try {
      let response = await deleteStudent(id);
      if (response.status === 204) {
        triggerToast("Student deleted successfully!!","success");
        await fetchStudents();
      } 
    } catch (e) {
      setLoading(false);
      triggerToast("Something went wrong :(", "error");
    }
  };

  const fetchStudents = async () => {
    try {
      let response = await listStudents();
      if (response.status === 200) {
        setStudents(response.data);
        setLoading(false);
      }
    } catch (e) {
      triggerToast("Something went wrong :(", "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    async function init() {
      await fetchStudents();
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
        <div className="text-xl font-bold">Students</div>
        <button
          className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded h-10 ml-auto"
          onClick={() => {
            navigate("/students-add");
          }}
        >
          Create Student
        </button>
      </div>
 
      {students.length ? (
        <Table
          tableHeaders={tableHeaders}
          showButtons
          tableData={students}
          fieldsMap={["firstName", "lastName", "email", "dob"]}
          deleteFunction={deleteStudentFunction}
        ></Table>
      ) : (
        <div className="text-base font-medium text-red-600 mt-4">
          No Student Found Please add Student from "Create Student" button
        </div>
      )}
    </div>
   )}
   </>
 );
};

export default StudentsComponent;
