import React from 'react'

const Dates = () => {

  const [inputValue, setInputValue] = React.useState('');
  const [dates, setDates] = React.useState([]);

  const searchDates = async () => {
    // Implement search functionality here
    // send a GET request to api/faculty/get-dates with classID
    const response = await fetch(`/api/faculty/get-dates/${inputValue}`);
    const data = await response.json();
    setDates(JSON.stringify(data));
  }

  return (
    <div>
        <h1>Dates</h1>
        <div>
          <input type="text" placeholder='Enter classID' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <button onClick={searchDates}>Search</button>
        </div>
        <div>{dates}</div>
    </div>
  )
}

export default Dates