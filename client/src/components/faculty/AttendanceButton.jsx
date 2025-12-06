import { Link } from "react-router";

const AttendanceButton = ({ classID }) => {
  const date = new Date().toISOString().split("T")[0];
  return (
    <Link to={`/take-attendance/${classID}/${date}`}>
      <button className="btn btn-dash btn-secondary">Take Attendance</button>
    </Link>
  );
};

export default AttendanceButton;
