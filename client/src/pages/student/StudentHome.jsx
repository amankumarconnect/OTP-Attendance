import { useState, useEffect } from "react";
import ClassCard from "../../components/student/ClassCard";
import { useAuth } from "../../context/AuthContext.jsx";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const { userID: studentID } = useAuth();

  useEffect(() => {
    // 2. Define Async Fetch Function
    const fetchClasses = async () => {
      try {
        const response = await fetch(`/api/student/get-classes/${studentID}`);
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    // 4. Call the function
    if (studentID) {
      fetchClasses();
    }
  }, [studentID]); // Dependencies

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-8">
      {classes.map(({ _id, classTitle }) => (
        <ClassCard key={_id} classID={_id} classTitle={classTitle} />
      ))}
    </div>
  );
};

export default Classes;
