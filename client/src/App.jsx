import "./App.css";

import { Routes, Route } from "react-router";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import CreateClass from "./pages/faculty/CreateClass.jsx";
import FacultyHome from "./pages/faculty/FacultyHome.jsx";
import ClassAttendance from "./pages/faculty/ClassAttendance.jsx";
import TakeAttendance from "./pages/faculty/TakeAttendance.jsx";
import MarkAttendance from "./pages/student/MarkAttendance.jsx";
import StudentHome from "./pages/student/StudentHome.jsx";
import MyAttendance from "./pages/student/MyAttendance.jsx";
import Layout from "./components/Layout.jsx";

function App() {
  const userRole = localStorage.getItem("userRole");
  return (
    <>
      <Routes>
        {!userRole ? (
          <Route path="*" element={<Login />} />
        ) : userRole === "faculty" ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<FacultyHome />} />
            <Route path="/create-class" element={<CreateClass />} />
            <Route
              path="/class-attendance/:classID/:date"
              element={<ClassAttendance />}
            />
            <Route
              path="/take-attendance/:classID"
              element={<TakeAttendance />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        ) : (
          <Route path="/" element={<Layout />}>
            <Route index element={<StudentHome />} />
            <Route path="/my-attendance/:classID" element={<MyAttendance />} />
            <Route
              path="/mark-attendance/:classID"
              element={<MarkAttendance />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
