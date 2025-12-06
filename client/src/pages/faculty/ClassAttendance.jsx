import { useState, useEffect } from "react";
import { useParams } from "react-router";
import AttendanceTable from "../../components/faculty/AttendanceTable.jsx";

const Day = () => {
  const { classID, date } = useParams();
  const [classTitle, setClassTitle] = useState("");

  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    // fetch classTitle from /api/get-class-title/${classID}
    const fetchClassTitle = async () => {
      try {
        const response = await fetch(`/api/get-class-title/${classID}`);
        const data = await response.json();
        setClassTitle(data.classTitle);
      } catch (error) {
        console.error("Error fetching class title:", error);
      }
    };
    fetchClassTitle();
  }, [classID]);

  const fetchAttendance = async () => {
    try {
      const response = await fetch(`/api/faculty/get-day/${classID}/${date}`);
      const data = await response.json();
      setAttendance(data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [classID, date]);

  const changeStatus = async (studentID) => {
    try {
      await fetch(
        `/api/faculty/change-status/${classID}/${date}/${studentID}`,
        { method: "PUT" },
      );
      fetchAttendance();
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  const presentStudents = attendance.filter((s) => s.status === "present");
  const absentStudents = attendance.filter((s) => s.status === "absent");

  const copyToClipboard = (students) => {
    const csv = students.map((s) => s.studentID).join("\n");
    navigator.clipboard.writeText(csv);
    alert("Copied to clipboard!");
  };

  return (
    <div className="m-8">
      <h1 className="text-4xl font-bold">{date}</h1>
      <h2 className="text-2xl text-gray-500">{classTitle}</h2>
      <div className="flex gap-4 my-4">
        <button
          className="btn btn-success tooltip tooltip-bottom"
          onClick={() => copyToClipboard(presentStudents)}
          data-tip="Click to copy"
        >
          Present: {presentStudents.length}
        </button>
        <button
          className="btn btn-error"
          onClick={() => copyToClipboard(absentStudents)}
        >
          Absent: {absentStudents.length}
        </button>
      </div>
      <AttendanceTable attendance={attendance} changeStatus={changeStatus} />
    </div>
  );
};

export default Day;
