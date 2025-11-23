import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { Routes, Route } from "react-router";
import Login from "./pages/Login.jsx";
import CreateClass from "./pages/faculty/CreateClass.jsx";
import FacultyClasses from "./pages/faculty/FacultyClasses.jsx";
import FacultyDates from "./pages/faculty/FacultyDates.jsx";
import Day from "./pages/faculty/Day.jsx";
import TakeAttendance from "./pages/faculty/TakeAttendance.jsx";
import MarkAttendance from "./pages/student/MarkAttendance.jsx";
import StudentClasses from "./pages/student/StudentClasses.jsx";
import StudentDates from "./pages/student/StudentDates.jsx";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/faculty/create-class" element={<CreateClass />} />
        <Route path="/faculty" element={<FacultyClasses />} />
        <Route path="/faculty/class/:classID" element={<FacultyDates />} />
        <Route path="/faculty/class/:classID/:date" element={<Day />} />
        <Route path="/faculty/attendance/:classID" element={<TakeAttendance />} />
        <Route path="/student" element={<StudentClasses />} />
        <Route path="/student/class/:classID" element={<StudentDates />} />
        <Route path="/student/mark-attendance" element={<MarkAttendance />} />
      </Routes>
    </>
  );
}

export default App;
