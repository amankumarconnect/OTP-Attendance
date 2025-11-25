import { useState, useEffect } from "react";

const AttendanceTable = ({ classID, studentID }) => {
  const [attendance, setAttendance] = useState([]);
  const searchDates = async () => {
    const response = await fetch(
      `/api/student/get-dates/${classID}/${studentID}`
    );
    const data = await response.json();
    setAttendance(data);
  };

  useEffect(() => {
    searchDates();
  }, [classID, studentID]);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map(({ date, status }) => (
            <tr key={date} className="hover:bg-base-300">
              <th>{date}</th>
              <td>
                <button
                  className={`btn btn-soft ${
                    status === "present" ? "btn-success" : "btn-error"
                  }`}
                >
                  {status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
