"use client";  // Mark as a Client Component

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use useParams instead of useRouter
import { getStory } from "@/api/storyApi";
import ContentComponent from "@/components/contentComponent";
import { Navbar } from "@/components/Navbar";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import {updateStory} from "@/api/storyApi"
// Define the Story type
interface User {
  _id: string;
  name: string;
  profilePicture?: string;
}
interface Chapter {
  _id?: string;
  title: string;
  content: string;
  likes:number;
  createdBy: string | User; // allow both types
  createdAt: string;
}
interface Author {
    id: string;
    name: string;
    bio: string;
    profileImage: string;
}
interface Story {
    _id: string;
    title: string;
    content: Chapter[];
    author: Author;
    votes: number;
    imageUrl: string;
}

export default function BookPage() {
   
    const params = useParams(); // Get story ID from the URL
    const [story, setStory] = useState<Story | null>(null);
    const id = params?.id as string;
    const handleUpdateStory = async (vote: number) => {
        if (!story) return;

        const updatedVotes = story.votes + vote;

        const updatedStory: Story = {
            ...story,
            votes: updatedVotes,
        };

        setStory(updatedStory); // Optimistic UI update
  try {
    await updateStory(id, updatedStory); // Send update to server
  } catch (error) {
    console.error("Failed to update story votes:", error);
  }
};
    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const storyData = await getStory(id as string);
                setStory(storyData);
            } catch (error) {
                console.error("Error fetching story:", error);
            }
        };
    fetchData();
    }, [id]);
    if (!story) {
        return <p className="text-center mt-10 text-gray-500"> Loading story...</p>;
    }
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="flex-col items-center">
            <div
            className="w-full flex items-center pb-10 bg-cover bg-center"
            style={{
                backgroundImage: `url(${story.imageUrl})`,
                backgroundRepeat: "no-repeat",
            }}
            >                 
                        <div className="m-10 p-6 flex flex-col">
                        <h1 className="text-7xl font-bold text-white pb-5">{story.title}</h1>
                        <h2 className="pl-3 text-white text-2xl">by {story.author ? (typeof story.author === "string" ? story.author : story.author.name) : "Unknown"}</h2>
                        <div className="flex gap-1.5 pl-3">
                            <div className="flex  text-white flex-col items-center">
                        <ArrowBigUp
                            size={30}
                            className="rounded-full bg-gray-400 mt-2 cursor-pointer"
                            onClick={() => handleUpdateStory(1)} // 👈 Pass a function, not a call
                            />
                            <h1>{story.votes}</h1>

                        <ArrowBigDown
                            size={30}
                            className="mt-2 cursor-pointer"
                            onClick={() => handleUpdateStory(-1)} // 👈 Correct downvote
                            />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10 h-px bg-gray-300 my-4 max-w-screen-2xl mx-auto" />
                <div className="text-black p-10">
                    <ContentComponent id={id} story={story.content} title={story.title} />
                </div>
            </div>
        </main>
    );
}
