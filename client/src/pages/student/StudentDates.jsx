import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Dates = () => {
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "student") {
      navigate("/faculty");
    }
  }, [navigate]);

  const [classInput, setClassInput] = useState("");
  const [dates, setDates] = useState([]);
  const studentID = localStorage.getItem("userID");

  const searchDates = async () => {
    const response = await fetch(
      `/api/student/get-dates/${classInput}/${studentID}`
    );
    const data = await response.json();
    setDates(JSON.stringify(data));
  };

  return (
    <div>
      <h1>Dates</h1>
      <div>
        <input
          type="text"
          placeholder="Enter classID"
          value={classInput}
          onChange={(e) => setClassInput(e.target.value)}
        />
        <button onClick={searchDates}>Search</button>
      </div>
      <div>{dates}</div>
    </div>
  );
};

export default Dates;
