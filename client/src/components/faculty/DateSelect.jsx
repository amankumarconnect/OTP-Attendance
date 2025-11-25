import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const DateSelect = ({ classID }) => {
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
      defaultValue="Choose Date"
      className="select select-primary"
      onChange={(e) => navigate(`/faculty/class/${classID}/${e.target.value}`)}
    >
      <option disabled={true}>Choose Date</option>
      {dates.map((date) => (
        <option key={date} value={date}>
          {date}
        </option>
      ))}
    </select>
  );
};

export default DateSelect;
