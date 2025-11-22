import { set } from "mongoose";
import React from "react";

const TakeAttendance = () => {
  const [code, setCode] = React.useState(null);
  const [timeLeft, setTimeLeft] = React.useState(null);
  const [classID, setClassID] = React.useState("");
  const [codeStatus, setCodeStatus] = React.useState("");

  // function to generate 4 digit random code
  const generateCode = async () => {
    const newCode = Math.floor(1000 + Math.random() * 9000);
    setCode(newCode);

    // send put request to server with the generated code
    const response = await fetch(`/api/faculty/update-code/${classID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: newCode }),
    });
    if (response.ok) {
      setCodeStatus("Code updated successfully!");
    } else {
      setCodeStatus("Failed to update code.");
    }
  };

  const countdown = () => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        return 15;
      }
      return prev - 1;
    });
  };

  let generateInterval;
  let timerInterval;

  const startGenerating = () => {
    generateCode();
    setTimeLeft(15);

    generateInterval = setInterval(generateCode, 15000);
    timerInterval = setInterval(countdown, 1000);
  };

  const stopGenerating = () => {
    clearInterval(generateInterval);
    clearInterval(timerInterval);
    setCode(null);
    setTimeLeft(0);
  };

  return (
    <div>
      <h1>Take Attendance</h1>
      <input
        type="text"
        id="classID"
        placeholder="Enter ClassID"
        value={classID}
        onChange={(e) => setClassID(e.target.value)}
      />
      <button onClick={startGenerating}>Start Generating</button>
      <button onClick={stopGenerating}>Stop Generating</button>
      <p>Code: {code}</p>
      <p>Expiring in: {timeLeft} seconds</p>
      <p>{codeStatus}</p>
    </div>
  );
};

export default TakeAttendance;
