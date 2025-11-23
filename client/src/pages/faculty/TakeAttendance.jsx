import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const TakeAttendance = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "faculty") {
      navigate("/student/get-classes");
    }
  }, [navigate]);

  const [code, setCode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [classID, setClassID] = useState("");
  const [codeStatus, setCodeStatus] = useState("");

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
