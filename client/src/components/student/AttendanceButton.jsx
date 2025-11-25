import { Link } from "react-router";

const AttendanceButton = ({ classID }) => {
  return (
    <Link to={`/student/attendance/${classID}`}>
      <button className="btn btn-dash btn-secondary">Mark Attendance</button>
    </Link>
  );
};

export default AttendanceButton;
