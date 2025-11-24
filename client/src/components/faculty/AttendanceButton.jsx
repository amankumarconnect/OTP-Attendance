import { Link } from "react-router";

const AttendanceButton = ({ classID }) => {
  return (
    <Link to={`/faculty/attendance/${classID}`}>
      <button className="btn btn-dash btn-primary">Take Attendance</button>
    </Link>
  );
};

export default AttendanceButton;
