"use client";

import { Navbar } from "@/components/Navbar";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getStory } from "@/api/storyApi";
import ReactMarkdown from 'react-markdown';

interface User {
  _id: string;
  name: string;
  profilePicture?: string;
}
interface Chapter {
  _id?: string;
  title: string;
  content: string;
  createdBy: string | User; // allow both types
  createdAt: string;
}
interface Author {
    id: string;
    name: string;
    bio: string;
    profileImage: string;
}



export default function ReadPage() {
  const searchParams = useSearchParams();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const title = searchParams.get("title");
  const id = searchParams.get("id");
  const chapId = searchParams.get("chapId")
  console.log(chapId)
     useEffect(() => {
    if (!id || chapId === null) return;
  
          const fetchData = async () => {
              try {
                  const storyData = await getStory(id as string);
                  console.log(storyData)
                  const chapterIndex = parseInt(chapId);
                   // convert to number
                  setChapter(storyData.content[chapterIndex]);
              } catch (error) {
                  console.error("Error fetching story:", error);
              }
          };
  
          fetchData();
      }, [id,chapId]);
  

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      {chapter ? (
        <div className="flex-col items-center p-10">
          <h1 className="text-5xl font-bold">{title}</h1>
          <h2 className="pl-2 text-2xl">{chapter.title}</h2>
          <div className="mt-10 h-px bg-gray-300 my-4 max-w-screen-2xl mx-auto" />
          <div className="h-full sm:h-[calc(100vh-28rem)] md:h-[calc(100vh-24rem)] lg:h-[calc(100vh-20rem)] xl:h-[calc(100vh-19rem)] overflow-y-auto p-6 border rounded-lg bg-white shadow-lg">
            
            <ReactMarkdown>{chapter.content}</ReactMarkdown>
        
          </div>
        </div>
      ) : (
        <p>No chapter data available</p>
      )}
    </main>
  );
}
