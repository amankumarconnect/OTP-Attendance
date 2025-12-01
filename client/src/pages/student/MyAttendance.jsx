import { useParams } from "react-router";
import AttendanceTable from "../../components/student/AttendanceTable.jsx";

const Dates = () => {
  const { classID: classID } = useParams();
  const studentID = localStorage.getItem("userID");

  return (
    <div className="m-8">
      <AttendanceTable classID={classID} studentID={studentID} />
    </div>
  );
};

export default Dates;
