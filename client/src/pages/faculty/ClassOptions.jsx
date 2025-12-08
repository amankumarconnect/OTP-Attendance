import { useState, useEffect } from "react";
import { useParams } from "react-router";
import StudentsTable from "../../components/faculty/StudentsTable";

const ClassOptions = () => {
  const { classID } = useParams();
  const [classTitle, setClassTitle] = useState("");
  const [students, setStudents] = useState([]);
  const [newStudentID, setNewStudentID] = useState("");
  useEffect(() => {
    const fetchClassTitle = async () => {
      try {
        const response = await fetch(`/api/get-class-title/${classID}`);
        const data = await response.json();
        setClassTitle(data.classTitle);
      } catch (error) {
        console.error("Error fetching class title:", error);
      }
    };
    fetchClassTitle();
  }, [classID]);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`/api/faculty/get-students/${classID}`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [classID]);

  const deleteStudent = async (studentID) => {
    try {
      const response = await fetch(
        `/api/faculty/delete-student/${classID}/${studentID}`,
        {
          method: "DELETE",
        },
      );
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const addStudent = async () => {
    try {
      const response = await fetch(`/api/faculty/add-student/${classID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentID: newStudentID }),
      });
      fetchStudents();
      setNewStudentID("");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const editClassTitle = async (newTitle) => {
    try {
      const response = await fetch(`/api/edit-class-title/${classID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newTitle }),
      });
      setClassTitle(newTitle);
    } catch (error) {
      console.error("Error editing class title:", error);
    }
  };

  const hideClass = async () => {
    try {
      const response = await fetch(`/api/hide-class/${classID}`, {
        method: "PATCH",
      });
      fetchStudents();
    } catch (error) {
      console.error("Error hiding class:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">{classTitle}</h1>
        <div className="flex gap-4">
          <button className="btn btn-primary">Edit Class Title</button>
          <button className="btn btn-warning" onClick={hideClass}>
            Hide Class
          </button>
          <button className="btn btn-error">Delete Class</button>
        </div>
      </div>
      <div className="mt-4 flex gap-4">
        <input
          type="text"
          placeholder="Enter StudentID"
          className="input"
          value={newStudentID}
          onChange={(e) => setNewStudentID(e.target.value)}
        />
        <button className="btn btn-soft btn-success" onClick={addStudent}>
          Add Student
        </button>
      </div>
      <StudentsTable students={students} deleteStudent={deleteStudent} />
    </div>
  );
};

export default ClassOptions;
