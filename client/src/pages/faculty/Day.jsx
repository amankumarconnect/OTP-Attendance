import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

const Day = () => {
  const navigate = useNavigate();
  const { classID, date } = useParams();
  const [day, setDay] = useState([]);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "faculty") {
      navigate("/student");
    }

    const searchDay = async () => {
      const response = await fetch(`/api/faculty/get-day/${classID}/${date}`);
      const data = await response.json();
      setDay(data);
    };
    searchDay();
  }, [navigate, classID, date]);

  return (
    <div>
      <h1>Day</h1>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {day.map(({ studentID, status }) => (
            <tr key={studentID}>
              <td>{studentID}</td>
              <td>{status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Day;
