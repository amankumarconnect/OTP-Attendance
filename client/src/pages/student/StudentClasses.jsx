import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";

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
    <div>
      <h1>Classes</h1>
      <ul>
        {classes.map((id) => (
          <li key={id}>
            <Link to={`/student/class/${id}`}>{id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Classes;
