import React from 'react'

const Classes = () => {

  const [inputValue, setInputValue] = React.useState('');
  const [classes, setClasses] = React.useState([]);

  const searchClasses = async () => {
    // Implement search functionality here
    // send a GET request to api/student/get-classes with studentID
    const response = await fetch(`/api/student/get-classes/${inputValue}`);
    const data = await response.json();
    setClasses(JSON.stringify(data));
  }

  return (
    <div>
        <h1>Classes</h1>
        <div>
          <input type="text" placeholder='Enter studentID' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <button onClick={searchClasses}>Search</button>
        </div>
        <div>{classes}</div>
    </div>
  )
}

export default Classes