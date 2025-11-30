import { Link } from "react-router";

const AttendanceButton = ({ classID }) => {
  return (
    <Link to={`/take-attendance/${classID}`}>
      <button className="btn btn-dash btn-secondary">Take Attendance</button>
    </Link>
  );
};

export default AttendanceButton;
