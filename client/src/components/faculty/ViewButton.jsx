import { Link } from "react-router";

const ViewButton = ({ classID, date }) => {
  return (
    <Link to={`/class-attendance/${classID}/${date}`}>
      <button className="btn btn-dash btn-primary">View Attendance</button>
    </Link>
  );
};

export default ViewButton;
