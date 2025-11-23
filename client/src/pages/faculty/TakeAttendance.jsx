import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

const TakeAttendance = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [codeStatus, setCodeStatus] = useState("");
  const { classID } = useParams();
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "faculty") {
      navigate("/student");
    }
  }, [navigate]);

  const updateCode = async (newCode) => {
    setCode(newCode);

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

  // The Master Effect
  useEffect(() => {
    let generateInterval;
    let timerInterval;

    if (isGenerating) {

      updateCode(Math.floor(1000 + Math.random() * 9000));
      setTimeLeft(15);


      generateInterval = setInterval(
        () => updateCode(Math.floor(1000 + Math.random() * 9000)),
        15000
      );
      timerInterval = setInterval(() => {
        setTimeLeft((prev) => (prev <= 1 ? 15 : prev - 1));
      }, 1000);
    }

    // CLEANUP FUNCTION (Runs on stop OR if user leaves page)
    return () => {
      clearInterval(generateInterval);
      clearInterval(timerInterval);
      updateCode(null);
    };
  }, [isGenerating]);

  // Simple Handlers
  const startGenerating = () => setIsGenerating(true);

  const stopGenerating = () => {
    setIsGenerating(false);
    setCode(null);
    setTimeLeft(0);
  };

  return (
    <div>
      <h1>Take Attendance</h1>
      <button onClick={startGenerating}>Start Generating</button>
      <button onClick={stopGenerating}>Stop Generating</button>
      <p>Code: {code}</p>
      <p>Expiring in: {timeLeft} seconds</p>
      <p>{codeStatus}</p>
    </div>
  );
};

export default TakeAttendance;
