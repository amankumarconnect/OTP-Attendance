import { Link } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

const NavBar = () => {
  const { logout } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <Link to={"/"} className="btn btn-ghost text-xl">
          Attendance
        </Link>
      </div>
      <div className="navbar-end">
        <button className="btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
