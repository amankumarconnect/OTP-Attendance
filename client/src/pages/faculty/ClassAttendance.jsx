import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import AttendanceTable from "../../components/faculty/AttendanceTable.jsx";

const Day = () => {
  const navigate = useNavigate();
  const { classID, date } = useParams();
  const [classTitle, setClassTitle] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "faculty") {
      navigate("/");
    }
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
  }, [navigate, classID]);

  return (
    <div className="m-8">
      <h1 className="text-4xl font-bold">{date}</h1>
      <h2 className="text-2xl text-gray-500">{classTitle}</h2>
      <AttendanceTable classID={classID} date={date} />
    </div>
  );
};

export default Day;
