import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import AttendanceTable from "../../components/student/AttendanceTable.jsx";

const Dates = () => {
  const navigate = useNavigate();
  const { classID: classID } = useParams();
  const studentID = localStorage.getItem("userID");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "student") {
      navigate("/faculty");
    }
  }, [navigate]);

  return (
    <div className="m-8">
      <AttendanceTable classID={classID} studentID={studentID} />
    </div>
  );
};

export default Dates;
