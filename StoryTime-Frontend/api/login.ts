import apiClient from "./axiosInstance";

interface LoginResponse {
  token: string;
}

export const login = async (email: string, password: string): Promise<void> => {
  try {
    const requestBody = { email, password };

    console.log("📤 Sending Login Data:", requestBody);

    const response = await apiClient.post<LoginResponse>(
      "/api/users/login",
      requestBody,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const { token } = response.data;
    localStorage.setItem("authToken", token);
    console.log("✅ Login successful, token stored.");
  } catch (error) {
    console.log("❌ Error occurred during login:", error);
  }
};
