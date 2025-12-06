import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const DateSelect = ({ classID, date }) => {
  const [dates, setDates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const searchDates = async () => {
      const response = await fetch(`/api/faculty/class/${classID}`);
      const data = await response.json();
      setDates(data);
    };
    if (classID) {
      searchDates();
    }
  }, [classID]);
  return (
    <select
      value={date}
      className="select"
      onChange={(e) =>
        navigate(`/class-attendance/${classID}/${e.target.value}`)
      }
    >
      {!dates.includes(date) && <option disabled={true}>{date}</option>}
      {dates.map((date) => (
        <option key={date} value={date}>
          {date}
        </option>
      ))}
    </select>
  );
};

export default DateSelect;
