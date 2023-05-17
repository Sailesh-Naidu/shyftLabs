import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import StudentsComponent from "./Components/Students";
import Home from "./Components/Home";
import Course from "./Components/Course";
import StudentForm from "./Components/StudentForm";
import CourseForm from "./Components/CourseForm";
import Results from "./Components/Results";
import ResultForm from "./Components/ResultForm";

const Layout = () => (
  <div className="flex flex-row">
    <Sidebar />
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/students-list",
        element: <StudentsComponent />,
      },
      {
        path: "/students-add",
        element: <StudentForm />,
      },
      {
        path: "/courses-list",
        element: <Course />,
      },
      {
        path: "/courses-add",
        element: <CourseForm />,
      },
      {
        path: "/results-list",
        element: <Results />,
      },
      {
        path: "/results-add",
        element: <ResultForm />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
