import { useState, useEffect } from "react";
import { useParams } from "react-router";
import DateSelect from "../../components/faculty/DateSelect.jsx";
import AttendanceTable from "../../components/faculty/AttendanceTable.jsx";
import TakeButton from "../../components/faculty/TakeButton.jsx";

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
      <h1 className="text-4xl font-bold text-gray-500 mb-2">{classTitle}</h1>
      <div className="flex justify-between">
        <DateSelect classID={classID} date={date} />
        <TakeButton classID={classID} date={date} />
      </div>
      <div>
        <div className="flex gap-4 my-4">
          <button
            className="btn btn-success tooltip tooltip-bottom"
            onClick={() => copyToClipboard(presentStudents)}
            data-tip="Click to copy"
          >
            Present: {presentStudents.length}
          </button>
          <button
            className="btn btn-error tooltip tooltip-bottom"
            onClick={() => copyToClipboard(absentStudents)}
            data-tip="Click to copy"
          >
            Absent: {absentStudents.length}
          </button>
        </div>
        <AttendanceTable attendance={attendance} changeStatus={changeStatus} />
      </div>
    </div>
  );
};

export default Day;
