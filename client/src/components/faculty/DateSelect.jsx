import { useState, useEffect } from "react";
import { Link } from "react-router";

const DateSelect = ({ classID }) => {
  const [dates, setDates] = useState([]);

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
    <select defaultValue="Choose Date" className="select select-primary">
      <option disabled={true}>Choose Date</option>
      {dates.map((date) => (
        <Link key={date} to={`/faculty/class/${classID}/${date}`}>
          <option>{date}</option>
        </Link>
      ))}
    </select>
  );
};

export default DateSelect;