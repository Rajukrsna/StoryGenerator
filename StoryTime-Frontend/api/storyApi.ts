import apiClient from './axiosInstance';
interface Contribution {
  title: string;
  score: number;
}
interface User {
  _id: string;
  name: string;
  profilePicture?: string;
  contributions?: Contribution[];  // ← updated from `Number` to `Contribution[]`

}
interface Chapter {
  _id?: string;
  title: string;
  content: string;
  likes: number;
 createdBy: string | User; // allow both types
  createdAt: string;
}
interface Author {
    id: string;
    name: string;
    bio: string;
    profileImage: string;
}

interface PendingChapter extends Chapter {
  requestedBy: string | User;
  status: "pending" | "approved" | "rejected";
}
interface Story {
    _id: string;
    title: string;
    content: Chapter[];
  pendingChapters: PendingChapter[]; // ✅ completed
    author: Author;
    votes: number;
    imageUrl: string;   
}

export const getStories = async (
  search?: string,
  sort?: "latest" | "oldest" | "top"
): Promise<Story[]> => {
  const params = new URLSearchParams();
  if (search?.trim()) params.append("search", search.trim());
  if (sort) params.append("sort", sort);

  const response = await apiClient.get<Story[]>(
    `/api/stories?${params.toString()}`
  );
  return response.data;
};


export const getStory = async (id: string): Promise<Story> => {
    const response = await apiClient.get<Story>(`/api/stories/${id}`);
    return response.data;
};

export const createStory = async (title: string,  initialContent: string // 👈 You’ll need to provide the user ID
,imageUrl: string): Promise<Story> => {
    const response = await apiClient.post<Story>('/api/stories', { title,  chapters: [
      {
        
        content: initialContent,
       
      }
    ], imageUrl });
    return response.data;
};

export const updateStory = async (id: string, story: Story, newChap: Chapter): Promise<Story> => {
    const response = await apiClient.put<Story>(`/api/stories/${id}`,  
        { votes: story.votes, content: story.content, newChapter: newChap}
 );
    return response.data;
};

export const deleteStory = async (id: string): Promise<void> => {
    await apiClient.delete(`/stories/${id}`);
};

export const voteStory = async (id: string, vote: number): Promise<Story> => {
    const response = await apiClient.post<Story>(`/stories/${id}/vote`, { vote });
    return response.data;
};

export interface LeaderboardEntry {
  userId: string;
  name: string;
  profilePicture?: string;
  totalScore: number;
}
export const getLeaderBoard = async (title: string): Promise<LeaderboardEntry[]> => {
  const response = await apiClient.get<LeaderboardEntry[]>(`/api/stories/leaderboard/${title}`);
  return response.data;
};

export const getUserStories = async():Promise<Story[]> => {
  const response = await apiClient.get<Story[]>("/api/stories/getUserStories");
  return response.data;
};

export const approveStory = async(storyId: string, chapterIndex: number): Promise<Story> =>{
  const response = await apiClient.put<Story>(`/api/stories/${storyId}/approve-chapter/${chapterIndex}`)
  return response.data;
};

export const rejectStory = async ( storyId: string , chapterIndex: number): Promise<Story>=>{
  const response = await apiClient.delete<Story>(`/api/stories/${storyId}/reject-chapter/${chapterIndex}`)
  return response.data
}

