import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleAuthBtn = () => {
  const googleLogin = useGoogleLogin({
    flow: "auth-code", // Forces the Code Flow
    onSuccess: async (codeResponse) => {
      console.log("Access Code Received:", codeResponse);

      // Send auth-code to your backend
      try {
        const response = await axios.post("/auth/google", {
          code: codeResponse.code,
        });

        console.log("Tokens from Backend:", response.data);
        // Save response.data.access_token to your local state or context
      } catch (error) {
        console.error("Error exchanging code:", error);
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
