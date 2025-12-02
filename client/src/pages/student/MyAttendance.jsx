import { useParams } from "react-router";
import AttendanceTable from "../../components/student/AttendanceTable.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const Dates = () => {
  const { classID: classID } = useParams();
  const { userID: studentID } = useAuth();

  return (
    <div className="m-8">
      <AttendanceTable classID={classID} studentID={studentID} />
    </div>
  );
};

export default Dates;
