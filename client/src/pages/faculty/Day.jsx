import {useState, useEffect} from 'react'
import { useNavigate } from "react-router";


const Day = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "faculty") {
      navigate("/student/get-classes");
    }
  }, [navigate]);

  const [classValue, setClassValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [day, setDay] = useState([]);

  const searchDay = async () => {
    // Implement search functionality here
    // send a GET request to api/faculty/get-day with classID and date
    const response = await fetch(`/api/faculty/get-day/${classValue}/${dateValue}`);
    const data = await response.json();
    setDay(JSON.stringify(data));
  }

  return (
    <div>
        <h1>Day</h1>
        <div>
          <input type="text" placeholder='Enter classID' value={classValue} onChange={(e) => setClassValue(e.target.value)} />
          <input type="text" placeholder='Enter date' value={dateValue} onChange={(e) => setDateValue(e.target.value)} />
          <button onClick={searchDay}>Search</button>
        </div>
        <div>{day}</div>
    </div>
  )
}

export default Day