import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { Routes, Route } from "react-router";
import Login from "./pages/Login.jsx";
import CreateClass from "./pages/faculty/CreateClass.jsx";
import Classes from "./pages/faculty/Classes.jsx";
import Dates from "./pages/faculty/Dates.jsx";
import Day from "./pages/faculty/Day.jsx";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/faculty/create-class" element={<CreateClass />} />
        <Route path="/faculty/get-classes" element={<Classes />} />
        <Route path="/faculty/get-dates" element={<Dates />} />
        <Route path="/faculty/get-day" element={<Day />} />
      </Routes>
    </>
  );
}

export default App;
