import { useState, useEffect } from "react";
import ClassCard from "../../components/faculty/ClassCard";
import { Link } from "react-router";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const facultyID = localStorage.getItem("userID");

  useEffect(() => {
    // 2. Define Async Fetch Function
    const fetchClasses = async () => {
      try {
        const response = await fetch(`/api/faculty/get-classes/${facultyID}`);
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    // 4. Call the function
    if (facultyID) {
      fetchClasses();
    }
  }, [facultyID]); // Dependencies

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-8">
        {classes.map(({ _id, classTitle }) => (
          <ClassCard key={_id} classID={_id} classTitle={classTitle} />
        ))}
      </div>
      <Link to={"/create-class"}>
        <button className="btn btn-circle btn-soft btn-accent btn-xl toast">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </Link>
    </>
  );
};

export default Classes;
