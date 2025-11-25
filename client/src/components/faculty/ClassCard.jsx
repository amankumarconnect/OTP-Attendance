import AttendanceButton from "./AttendanceButton";
import DateSelect from "./DateSelect";

const ClassCard = ({ classItem }) => {
  return (
    <div className="card w-full bg-neutral">
      <div className="card-body">
        <h2 className="card-title">{classItem.classTitle}</h2>
        <div className="card-actions">
          <AttendanceButton classID={classItem._id}/>
          <DateSelect classID={classItem._id} />
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
