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
interface AISuggestion{
    id: string;
    suggestion: string;
}



export const createAIStory = async (title: string, content: string): Promise<AISuggestion> => {
    const response = await apiClient.post<AISuggestion>('/api/ai-suggestions', { title, content});
    return response.data;
};