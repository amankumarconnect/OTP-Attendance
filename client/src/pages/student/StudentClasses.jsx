import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import ClassCard from "../../components/student/ClassCard";

const Classes = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const studentID = localStorage.getItem("userID");

  useEffect(() => {
    // 1. Check Role
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "student") {
      navigate("/faculty");
      return; // Stop execution if redirecting
    }

    // 2. Define Async Fetch Function
    const fetchClasses = async () => {
      try {
        const response = await fetch(
          `/api/student/get-classes/${studentID}`
        );
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    // 4. Call the function
    if (studentID) {
      fetchClasses();
    }
  }, [navigate, studentID]); // Dependencies

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-8">
      {classes.map((classID) => (
        <ClassCard key={classID} classID={classID} />
      ))}
    </div>
  );
};

export default Classes;
