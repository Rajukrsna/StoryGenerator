import apiClient from "./axiosInstance";
import type { AxiosError } from "axios";

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
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    if (axiosError?.isAxiosError) {
      console.error("❌ Login failed:", axiosError.message);
    } else if (error instanceof Error) {
      console.error("❌ Unexpected error:", error.message);
    } else {
      console.error("❌ Unknown error occurred");
    }
    throw error;
  }
};
