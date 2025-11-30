import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

const TakeAttendance = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [codeStatus, setCodeStatus] = useState("");
  const { classID } = useParams();
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "faculty") {
      navigate("/");
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
      if (isGenerating) {
        updateCode(null);
      }
    };
  }, [isGenerating]);

  // Simple Handlers
  const startGenerating = () => setIsGenerating(true);

  const stopGenerating = () => {
    setIsGenerating(false);
    setCode(null);
    setTimeLeft(0);
    setCodeStatus("Code generation stopped.");
  };

  return (
    <div className="m-8 flex flex-col gap-6 items-center">
      <div className="flex flex-col items-center">
        {isGenerating ? (
          <p className="text-[35vmin] font-medium">{code}</p>
        ) : (
          <p className="text-[35vmin] text-gray-500">XXXX</p>
        )}
        <div className="divider">Code</div>
        <p className={!isGenerating ? "invisible" : "text-3xl"}>
          Expiring in: {timeLeft} seconds
        </p>
      </div>
      {isGenerating ? (
        <button
          className="btn btn-outline btn-error btn-xl"
          onClick={stopGenerating}
        >
          Stop Generating
        </button>
      ) : (
        <button
          className="btn btn-outline btn-success btn-xl"
          onClick={startGenerating}
        >
          Start Generating
        </button>
      )}
    </div>
  );
};

export default TakeAttendance;
