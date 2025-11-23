// faculty/class/:id

import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";

const Dates = () => {
  const navigate = useNavigate();
  // instead of input, take classID from params
  const { classID: classID } = useParams();
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "faculty") {
      navigate("/student");
    }

    const searchDates = async () => {
      const response = await fetch(`/api/faculty/class/${classID}`);
      const data = await response.json();
      setDates(data);
    };
    if (classID) {
      searchDates();
    }
  }, [navigate, classID]);

  return (
    <div>
      <div>
        <h1>Dates</h1>
        <ul>
          {dates.map((date) => (
            <li key={date}>
              <Link to={`/faculty/class/${classID}/${date}`}>{date}</Link>
            </li>
          ))}
        </ul>
      </div>
      <Link to={`/faculty/attendance/${classID}`}>
        <button>Take Attendance</button>
      </Link>
    </div>
  );
};

export default Dates;
