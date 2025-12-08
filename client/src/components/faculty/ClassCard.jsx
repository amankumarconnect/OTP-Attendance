import TakeButton from "./TakeButton";
import ViewButton from "./ViewButton";
import { Link } from "react-router";

const ClassCard = ({ classID, classTitle }) => {
  const date = new Date().toISOString().split("T")[0];
  return (
    <div className="card w-full bg-neutral">
      <div className="card-body">
        <Link className="card-title" to={`/class/${classID}`}>
          {classTitle}
        </Link>
        <div className="card-actions">
          <TakeButton classID={classID} date={date} />
          <ViewButton classID={classID} date={date} />
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
