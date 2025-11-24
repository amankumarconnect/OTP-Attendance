import React from "react";
import GoogleAuthBtn from "../components/GoogleAuthBtn";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Welcome To ATTENDANCE!</h2>
          <p>Login with your University account</p>
          <div className="card-actions">
            <GoogleAuthBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
