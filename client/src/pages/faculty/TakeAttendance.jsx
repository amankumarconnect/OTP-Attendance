import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const TakeAttendance = () => {
  const [code, setCode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [codeStatus, setCodeStatus] = useState("");
  const { classID, date } = useParams();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  const takeAttendance = async (newCode) => {
    setCode(newCode);

    const response = await fetch(
      `/api/faculty/take-attendance/${classID}/${date}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: newCode }),
      },
    );
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
      takeAttendance(Math.floor(1000 + Math.random() * 9000));
      setTimeLeft(15);

      generateInterval = setInterval(
        () => takeAttendance(Math.floor(1000 + Math.random() * 9000)),
        15000,
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
        takeAttendance(null);
      }
    };
  }, [isGenerating, date, classID]);

  // Simple Handlers
  const startGenerating = () => setIsGenerating(true);

  const stopGenerating = () => {
    setIsGenerating(false);
    setCode(null);
    setTimeLeft(0);
    setCodeStatus("Code generation stopped.");
  };

  return (
    <div className="m-8 flex flex-col gap-4 items-center">
      <input
        type="date"
        className="input input-bordered w-full max-w-xs"
        value={date}
        onChange={(e) =>
          navigate(`/take-attendance/${classID}/${e.target.value}`)
        }
      />
      <div className="flex flex-col items-center">
        {isGenerating ? (
          <p className="text-[33vmin] font-medium">{code}</p>
        ) : (
          <p className="text-[33vmin] text-gray-500">XXXX</p>
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
