import { Link } from "react-router";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <Link to={"/"} className="btn btn-ghost text-xl">Attendance</Link>
      </div>
      <div className="navbar-end">
        <Link to={"/"} className="btn">Home</Link>
      </div>
    </div>
  );
};

export default NavBar;
