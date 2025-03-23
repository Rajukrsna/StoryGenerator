import apiClient from './axiosInstance';

interface Story {
    id: string;
    title: string;
    content: string;
    author: string;
    votes: number;
}

export const getStories = async (): Promise<Story[]> => {
    const response = await apiClient.get<Story[]>('/stories');
    return response.data;
};

export const getStory = async (id: string): Promise<Story> => {
    const response = await apiClient.get<Story>(`/stories/${id}`);
    return response.data;
};

export const createStory = async (title: string, content: string): Promise<Story> => {
    const response = await apiClient.post<Story>('/stories', { title, content });
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