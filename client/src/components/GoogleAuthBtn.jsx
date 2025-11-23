import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router";

const GoogleAuthBtn = () => {
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    flow: "auth-code", // Forces the Code Flow
    onSuccess: async (codeResponse) => {
      const response = await axios.post("/auth/google", {
        code: codeResponse.code,
      });

      const { role, tokens, userID } = response.data;
      localStorage.setItem('userRole', role);
      localStorage.setItem('userID', userID);

      if (role === 'student') {
        navigate('/student/get-classes');
      } else {
        navigate('/faculty/get-classes');
      }

    },
    onError: (errorResponse) => console.log("Login Failed:", errorResponse),
  });

  return (
    // Plain button, no styles
    <button onClick={() => googleLogin()}>Sign in with Google</button>
  );
};

export default GoogleAuthBtn;
