import React from 'react'

const Day = () => {

  const [classValue, setClassValue] = React.useState('');
  const [dateValue, setDateValue] = React.useState('');
  const [day, setDay] = React.useState([]);

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