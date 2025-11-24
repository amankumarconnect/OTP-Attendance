import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const CreateClass = () => {
  const [inputStudentIDs, setInputStudentIDs] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "faculty") {
      navigate("/student");
    }
  }, [navigate]);

  const addClass = async () => {
    const facultyID = localStorage.getItem("userID");
    const studentIDs = inputStudentIDs.split(",").map((id) => id.trim());
    const response = await fetch("/api/faculty/create-class", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ facultyID, studentIDs }),
    });
    if (response.ok) {
      setStatus("Success");
    } else {
      setStatus("Error");
    }
  };

  return (
    <div className="m-8">
      <h1 className="text-4xl font-bold">Create Class</h1>
      <div className="m-16 flex flex-col gap-4">
        <textarea
          name="studentIDs"
          id="studentIDs"
          placeholder="Enter StudentIDs separated by commas"
          rows="10"
          className="textarea w-full"
          value={inputStudentIDs}
          onChange={(e) => setInputStudentIDs(e.target.value)}
        ></textarea>
        <button className="btn btn-outline btn-primary" onClick={addClass}>
          Add Class
        </button>
      </div>
      {status === "Success" && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your class has been created successfully!</span>
        </div>
      )}
      {status === "Error" && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error creating class.</span>
        </div>
      )}
    </div>
  );
};

export default CreateClass;
