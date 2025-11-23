import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";

const Dates = () => {
  const navigate = useNavigate();
  const { classID: classID } = useParams();
  const [dates, setDates] = useState([]);
  const studentID = localStorage.getItem("userID");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "student") {
      navigate("/faculty");
    }
    searchDates();
  }, [navigate, classID, studentID]);

  const searchDates = async () => {
    const response = await fetch(
      `/api/student/get-dates/${classID}/${studentID}`
    );
    const data = await response.json();
    setDates(data);
  };

  return (
    <div>
      <Link to={`/student/attendance/${classID}`}><button>Mark Attendance</button></Link>
      <h1>Dates</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dates.map(({ date, status }) => (
            <tr key={date}>
              <td>{date}</td>
              <td>{status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dates;
