import { OAuth2Client } from "google-auth-library";

// Initialize the Google Client
const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "postmessage" // This is required for the 'auth-code' flow from a React client
);

// 1. Route to exchange the code for tokens
export const exchangeCodeForTokens = async (req, res) => {
  try {
    const { code } = req.body;

    // Exchange code for tokens
    const { tokens } = await oAuth2Client.getToken(code);
    console.log(tokens);

    // Ideally, save the refresh_token to your database associated with the user
    // Send the tokens back to the client
    res.json(tokens);
  } catch (error) {
    console.error("Error exchanging token:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 2. Route to refresh the access token using the refresh token
export const refreshTheToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // Set credentials on the client to use the refresh token
    oAuth2Client.setCredentials({ refresh_token: refreshToken });

    const { credentials } = await oAuth2Client.refreshAccessToken();
    res.json(credentials);
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ error: "Could not refresh token" });
  }
};
