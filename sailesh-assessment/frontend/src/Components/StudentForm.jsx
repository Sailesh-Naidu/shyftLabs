import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import "../App.css";
import moment from "moment";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createStudent } from "../Services/http";

const StudentForm = () => {
  const [firstName, setFirstName] = useState(
    "" //If The mode is edit initial data is set to get data from current data
  );
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    dob: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const validator = () => {
    return !firstName || !lastName;
  };

  const triggerToast = (message, code = "success") => {
    if (code === "success") {
      toast.success(message, { theme: "colored" });
    } else {
      toast.error(message, { theme: "colored" });
    }
  };

  const savePayload = async () => {
    if (moment().diff(dob, "years") < 10) {
      setError({
        dob: "User should be atleast 10 years old.",
      });
      return;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError({
        email: "Enter Valid Email.",
      });
      return;
    }
    let payload = {
      firstName,
      lastName,
      email,
      dob: moment(dob).format("YYYY-MM-DD"),
    };

    setLoading(true);
    //Adds a new student
    triggerToast("New Student Added Successfully..", "success");
    try {
      let response = await createStudent(payload);

      if (response.status === 201) {
        setDob("");
        setEmail("");
        setFirstName("");
        setLastName("");
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

  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    setError({ ...error, dob: "" });
    setDob(e.target.value);
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
              Create Student
            </div>
            <div className="p-4">
              <div className="flex flex-row mb-4 justify-between items-center">
                <label className="block text-gray-700 text-sm font-bold w-[20%]">
                  First Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-row mb-6 justify-between items-center">
                <label className="block text-gray-700 text-sm font-bold w-[20%]">
                  Last Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastName"
                  type="text"
                  value={lastName}
                  placeholder="Enter last name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-row mb-6 justify-between items-center">
                <label className="block text-gray-700 text-sm font-bold w-[20%]">
                  Email
                </label>
                <div className="flex flex-col w-[80%]">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    value={email}
                    placeholder="Enter Email Address"
                    onChange={(e) => {
                      setError({ ...error, email: "" });
                      setEmail(e.target.value);
                    }}
                  />
                  <span class="block sm:inline text-red-700 px-4">
                    {error.email}
                  </span>
                </div>
              </div>

              <div className="flex flex-row mb-2 justify-between items-center">
                <label className="block text-gray-700 text-sm font-bold w-[20%]">
                  Date of birth
                </label>
                 
                <div className="flex flex-col w-[80%]">
                  <input
                    className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="dob"
                    type="date"
                    onChange={handleChange}
                    ref={dateInputRef}
                    value={dob}
                  />
                  <span class="block sm:inline text-red-700 px-4">
                    {error.dob}
                  </span>
                </div>
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

export default StudentForm;
