import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// if userRole is not faculty, redirect to student classes page

const CreateClass = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "faculty") {
      navigate("/student/get-classes");
    }
  }, [navigate]);

  const [classStatus, setClassStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = e.target;
    const facultyID = localStorage.getItem("userID");
    const studentIDs = data.studentIDs.value.split(",").map((id) => id.trim());
    const response = await fetch("/api/faculty/create-class", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ facultyID, studentIDs }),
    });
    if (response.ok) {
      setClassStatus("Class created successfully!");
    } else {
      setClassStatus("Failed to create class.");
    }
  };

  return (
    <div>
      <h1>Create Class</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="studentIDs">Student IDs:</label>
        <textarea
          name="studentIDs"
          id="studentIDs"
          placeholder="Enter StudentIDs separated by commas"
          rows="10"
        ></textarea>
        <button type="submit">Add Class</button>
      </form>
      <p>{classStatus}</p>
    </div>
  );
};

export default CreateClass;
