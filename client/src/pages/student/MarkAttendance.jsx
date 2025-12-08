import { useState } from "react";
import { useParams } from "react-router";
import { OTPInput } from "input-otp";
import { useAuth } from "../../context/AuthContext.jsx";

const MarkAttendance = () => {
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const { classID } = useParams();
  const { userID: studentID } = useAuth();

  const updateAttendance = async (code) => {
    try {
      const response = await fetch(
        `/api/student/update-attendance/${classID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentID,
            code: code,
          }),
        },
      );
      if (response.ok) {
        setAttendanceStatus("Success");
      } else if (response.status === 400) {
        setAttendanceStatus("Warning");
      } else {
        setAttendanceStatus("Error");
      }
    } catch (error) {
      setAttendanceStatus("Error");
    }
  };

  return (
    <div className="m-8">
      <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
        <label className="text-2xl">Enter Attendance Code:</label>
        <OTPInput
          maxLength={4}
          onComplete={updateAttendance}
          render={({ slots }) => (
            <div className="flex gap-4">
              {slots.map((slot, idx) => (
                <div
                  key={idx}
                  className={`input input-bordered h-auto flex-1 aspect-square flex items-center justify-center text-4xl
                  ${
                    slot.isActive ? "input-primary ring-4 ring-primary/20" : ""
                  }`}
                >
                  {slot.char}
                  {/* The Fake Cursor */}
                  {slot.hasFakeCaret && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      {/* h-8 controls cursor height, bg-base-content uses your theme text color */}
                      <div className="w-1 h-8 bg-base-content animate-pulse" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        />
      </div>
      <div className="toast toast-center toast-bottom">
        {attendanceStatus === "Success" && (
          <div role="alert" className="alert alert-success alert-soft">
            <span>Attendance marked successfully!</span>
          </div>
        )}
        {attendanceStatus === "Warning" && (
          <div role="alert" className="alert alert-warning alert-soft">
            <span>Invalid attendance code!</span>
          </div>
        )}
        {attendanceStatus === "Error" && (
          <div role="alert" className="alert alert-error alert-soft">
            <span>Error marking attendance. Please try again later.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkAttendance;
