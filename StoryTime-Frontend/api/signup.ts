import apiClient from "./axiosInstance";

interface SignUpResponse {
  token: string;
}

export const signup = async (
  name: string,
  email: string,
  password: string,
  profilePicture: string | null // Change File to string (URL)
): Promise<void> => {
  const requestBody = {
    name,
    email,
    password,
    profilePicture:profilePicture || " ", // If you need file upload, do it separately
  };

  // 🛑 Log the request payload
  console.log("📤 Sending Signup Data:", requestBody);

  try {
    const response = await apiClient.post<SignUpResponse>(
      "/api/users/register", // ✅ Correct path
      requestBody,
      {
        headers: { "Content-Type": "application/json" }, // Ensure JSON headers
      }
    );

    const { token } = response.data;
    localStorage.setItem("authToken", token);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Sign-up failed", (error as any).response?.data || error.message);
    } else {
      console.error("❌ Sign-up failed with an unknown error", error);
    }
    throw error;
  }
  
};
