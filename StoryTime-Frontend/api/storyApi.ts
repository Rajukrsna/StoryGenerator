import apiClient from './axiosInstance';

interface Author {
    id: string;
    name: string;
    bio: string;
    profileImage: string;
}
interface Story {
    _id: string;
    title: string;
    content: string;
    author: Author;
    votes: number;
    imageUrl: string;   
}

export const getStories = async (): Promise<Story[]> => {
    const response = await apiClient.get<Story[]>('/api/stories');
    return response.data;
};

export const getStory = async (id: string): Promise<Story> => {
    const response = await apiClient.get<Story>(`/api/stories/${id}`);
    return response.data;
};

export const createStory = async (title: string, content: string,imageUrl: string): Promise<Story> => {
    const response = await apiClient.post<Story>('/api/stories', { title, content, imageUrl });
    return response.data;
};

export const updateStory = async (id: string, title: string, content: string): Promise<Story> => {
    const response = await apiClient.put<Story>(`/stories/${id}`, { title, content });
    return response.data;
};

export const deleteStory = async (id: string): Promise<void> => {
    await apiClient.delete(`/stories/${id}`);
};

export const voteStory = async (id: string, vote: number): Promise<Story> => {
    const response = await apiClient.post<Story>(`/stories/${id}/vote`, { vote });
    return response.data;
};