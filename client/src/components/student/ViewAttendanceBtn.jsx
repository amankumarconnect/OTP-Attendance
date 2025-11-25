import { Link } from "react-router";

const AttendanceButton = ({ classID }) => {
  return (
    <Link to={`/student/class/${classID}`}>
      <button className="btn btn-outline btn-primary">View Attendance</button>
    </Link>
  );
};

export default AttendanceButton;
