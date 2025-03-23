import apiClient from './axiosInstance';

interface Author {
    id: string;
    name: string;
    bio: string;
    profileImage: string;
}

export const getAuthors = async (): Promise<Author[]> => {
    const response = await apiClient.get<Author[]>('/authors');
    return response.data;
};

export const getAuthor = async (id: string): Promise<Author> => {
    const response = await apiClient.get<Author>(`/authors/${id}`);
    return response.data;
};

export const createAuthor = async (name: string, bio: string, profileImage: string): Promise<Author> => {
    const response = await apiClient.post<Author>('/authors', { name, bio, profileImage });
    return response.data;
};

export const updateAuthor = async (id: string, name: string, bio: string, profileImage: string): Promise<Author> => {
    const response = await apiClient.put<Author>(`/authors/${id}`, { name, bio, profileImage });
    return response.data;
};

export const deleteAuthor = async (id: string): Promise<void> => {
    await apiClient.delete(`/authors/${id}`);
};
