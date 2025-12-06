import { Link } from "react-router";

const TakeButton = ({ classID, date }) => {
  return (
    <Link to={`/take-attendance/${classID}/${date}`}>
      <button className="btn btn-dash btn-secondary">Take Attendance</button>
    </Link>
  );
};

export default TakeButton;
