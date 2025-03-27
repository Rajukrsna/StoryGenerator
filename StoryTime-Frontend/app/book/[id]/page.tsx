"use client";  // Mark as a Client Component

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use useParams instead of useRouter
import { getStory } from "@/api/storyApi";
import ContentComponent from "@/components/contentComponent";
import { Navbar } from "@/components/Navbar";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

// Define the Story type
interface Story {
    _id: string;
    title: string;
    content: string;
    author: { name: string } | null;
    votes: number;
}

export default function BookPage() {
    const { id } = useParams(); // Get story ID from the URL
    const [story, setStory] = useState<Story | null>(null);

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
        return <p className="text-center mt-10 text-gray-500">Loading story...</p>;
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="flex-col items-center">
                <div className="bg-gray-300 w-full flex items-center pb-10">
                    <div className="m-10 p-6 flex flex-col">
                        <h1 className="text-7xl font-bold pb-5">{story.title}</h1>
                        <h2 className="pl-3 text-2xl">by {story.author ? story.author.name : "Unknown"}</h2>
                        <div className="flex gap-1.5 pl-3">
                            <div className="flex flex-col items-center">
                                <ArrowBigUp size={30} className="rounded-full bg-gray-400 mt-2" />
                                <h1>{story.votes}</h1>
                            </div>
                            <div className="flex flex-col items-center">
                                <ArrowBigDown size={30} className="mt-2" />
                                <h1>0</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10 h-px bg-gray-300 my-4 max-w-screen-2xl mx-auto" />
                <div className="text-black p-10">
                    <ContentComponent />
                </div>
            </div>
        </main>
    );
}
