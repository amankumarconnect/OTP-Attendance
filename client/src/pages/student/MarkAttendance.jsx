import React from "react";

const MarkAttendance = () => {
  const [attendanceStatus, setAttendanceStatus] = React.useState("");
  const [inputCode, setInputCode] = React.useState("");
  const [studentID, setStudentID] = React.useState("");
  const [classID, setClassID] = React.useState("");
  const [date, setDate] = React.useState("");

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
          placeholder="Enter studentID"
          value={studentID}
          onChange={(e) => setStudentID(e.target.value)}
        />
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
