import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import AttendanceTable from "../../components/faculty/AttendanceTable.jsx";

const Day = () => {
  const navigate = useNavigate();
  const { classID, date } = useParams();
  

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "faculty") {
      navigate("/student");
    }
  }, [navigate]);

  return (
    <div className="m-8">
      <h1 className="text-4xl font-bold">{date}</h1>
      <AttendanceTable classID={classID} date={date} />
    </div>
  );
};

export default Day;
