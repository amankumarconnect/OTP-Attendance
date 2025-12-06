const AttendanceTable = ({ attendance, changeStatus }) => {
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
          {attendance.map(({ studentID, status }) => (
            <tr key={studentID} className="hover:bg-base-300">
              <th>{studentID}</th>
              <td>
                {/* if status present, button className = "btn btn-soft btn-success tooltip" else "btn btn-soft btn-error tooltip". and data-tip = "Click to change status" */}
                <button
                  onClick={() => changeStatus(studentID)}
                  className={`btn btn-soft ${
                    status === "present" ? "btn-success" : "btn-error"
                  } tooltip`}
                  data-tip="Click to change"
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
