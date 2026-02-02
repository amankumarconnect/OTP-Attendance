import { Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { StudentSignup } from "./pages/StudentSignup";
import { FacultySignup } from "./pages/FacultySignup";
import { StudentHome } from "./pages/StudentHome";
import { FacultyHome } from "./pages/FacultyHome";

export function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup">
        <Route path="student" element={<StudentSignup />} />
        <Route path="faculty" element={<FacultySignup />} />
      </Route>
      <Route path="student" element={<StudentHome />} />
      <Route path="faculty" element={<FacultyHome />} />
    </Routes>
  );
}

export default App;
