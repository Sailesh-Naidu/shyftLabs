import {
  UserCircleIcon,
  BookOpenIcon,
  HomeIcon,
  DocumentCheckIcon,
  UserPlusIcon,
  DocumentPlusIcon,
  DocumentChartBarIcon,
  FolderPlusIcon
} from "@heroicons/react/24/outline";

export const sidebarData = [
  {
    name: "Home",
    path: "/",
    icon: HomeIcon,
    className: "nav-text",
  },
  {
    name: "Students List",
    path: "/students-list",
    icon: UserCircleIcon,
    className: "nav-text",
  },
  {
    name: "Add Student",
    path: "/students-add",
    icon: UserPlusIcon,
    className: "nav-text",
  },
  {
    name: "Course List",
    path: "/courses-list",
    icon: BookOpenIcon,
    className: "nav-text",
  },
  {
    name: "Add Course",
    path: "/courses-add",
    icon: DocumentPlusIcon,
    className: "nav-text",
  },
  {
    name: "Add Result",
    path: "/results-add",
    icon: FolderPlusIcon,
    className: "nav-text",
  },
  {
    name: "Results",
    path: "/results-list",
    icon: DocumentChartBarIcon,
    className: "nav-text",
  },
];

export const tableHeaders = [
  "First Name",
  "Last Name",
  "Email",
  "Date of Birth",
];

export const tableCourseHeaders = ["Course Name"];


export const tableResultsHeaders = ["Course Name","Student Name","Score"];
