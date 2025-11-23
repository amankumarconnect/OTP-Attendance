import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

const MarkAttendance = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "student") {
      navigate("/faculty");
    }
  }, [navigate]);

  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [inputCode, setInputCode] = useState("");
  const { classID } = useParams();
  const date = new Date().toISOString().split('T')[0];
  const studentID = localStorage.getItem('userID');

  const updateAttendance = async () => {
    try {
      const response = await fetch(
        "/api/student/update-attendance",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            classID,
            date,
            studentID,
            code: inputCode,
          }),
        }
      );
      setAttendanceStatus(await response.text());
    } catch (error) {
      setAttendanceStatus("Error: " + error.message);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter Code"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button onClick={updateAttendance}>Submit</button>
      </div>
      <div>{attendanceStatus}</div>
    </div>
  );
};

export default MarkAttendance;
