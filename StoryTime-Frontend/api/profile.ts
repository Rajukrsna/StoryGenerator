import apiClient from './axiosInstance';

interface Contribution {
  title: string;
  score: number;
}
interface User {
  _id: string;
  name: string;
  email?: string;
  bio?: string;
  profilePicture?: string;
  contributions?: Contribution[];  // ← updated from `Number` to `Contribution[]`
}

export const getAuthors = async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/api/users/all');
    
    return response.data;
};

//  Get current logged-in user's profile
export const getMyProfile = async (): Promise<User> => {
  const response = await apiClient.get<User>("/api/users/profile");
  return response.data;
};

//  Get user by ID (publicly accessible)
export const getUserById = async (userId: string): Promise<User> => {
  const response = await apiClient.get<User>(`/api/users${userId}`);
  return response.data;
};

// Update user profile
export const updateMyProfile = async (data: Partial<User> & { password?: string }): Promise<User> => {
  const response = await apiClient.put<User>("/api/users/profile", data);
  return response.data;
};

interface UploadResponse {
  message: string;
  filePath: string;
}

export const updateProfileImage = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('profilePicture', file);

  const response = await apiClient.post<UploadResponse>(
    "/api/users/change-pic",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
