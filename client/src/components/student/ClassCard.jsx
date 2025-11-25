import AttendanceButton from "./AttendanceButton";
import ViewAttendanceBtn from "./ViewAttendanceBtn";

const ClassCard = ({ classID }) => {
  return (
    <div className="card w-full bg-neutral">
      <div className="card-body">
        <h2 className="card-title">{classID}</h2>
        <div className="card-actions">
          <AttendanceButton classID={classID}/>
          <ViewAttendanceBtn classID={classID} />
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
