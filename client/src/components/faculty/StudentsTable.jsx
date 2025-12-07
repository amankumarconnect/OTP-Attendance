import React from "react";

const StudentsTable = ({ students, deleteStudent }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((studentID) => (
            <tr key={studentID} className="hover:bg-base-300">
              <th>{studentID}</th>
              <td>
                <button
                  onClick={() => deleteStudent(studentID)}
                  className={`btn btn-soft btn-error tooltip`}
                  data-tip="Click to delete student"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
