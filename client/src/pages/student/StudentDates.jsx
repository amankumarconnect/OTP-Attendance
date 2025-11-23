import React from 'react'

const Dates = () => {

  const [classInput, setClassInput] = React.useState('');
  const [studentInput, setStudentInput] = React.useState('');
  const [dates, setDates] = React.useState([]);

  const searchDates = async () => {
    const response = await fetch(`/api/student/get-dates/${classInput}/${studentInput}`);
    const data = await response.json();
    setDates(JSON.stringify(data));
  }

  return (
    <div>
        <h1>Dates</h1>
        <div>
          <input type="text" placeholder='Enter classID' value={classInput} onChange={(e) => setClassInput(e.target.value)} />
          <input type="text" placeholder='Enter studentID' value={studentInput} onChange={(e) => setStudentInput(e.target.value)} />
          <button onClick={searchDates}>Search</button>
        </div>
        <div>{dates}</div>
    </div>
  )
}

export default Dates