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
      setDay(JSON.stringify(data));
    };
    searchDay();
  }, [navigate, classID, date]);

  return (
    <div>
      <h1>Day</h1>
      <div>{day}</div>
    </div>
  );
};

export default Day;
