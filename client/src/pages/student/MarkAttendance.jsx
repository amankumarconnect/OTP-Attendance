import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const MarkAttendance = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "student") {
      navigate("/faculty/get-classes");
    }
  }, [navigate]);

  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [classID, setClassID] = useState("");
  const [date, setDate] = useState("");
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
          placeholder="Enter classID"
          value={classID}
          onChange={(e) => setClassID(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
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
