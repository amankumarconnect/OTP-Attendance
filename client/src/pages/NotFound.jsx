import { Link } from "react-router";

const NotFound = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">404 - Not Found</h1>
          <p className="mb-5">
            Did you take a wrong turn? Because this page doesn't exist.
          </p>
          <Link to={"/"}>
            <button className="btn btn-primary">Go Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
