"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardHorizontal } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Filter, Heart, Pencil, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getStory } from "@/api/storyApi"
import {getLeaderBoard} from "@/api/storyApi"
// Correct Chapter interface
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
interface Story {
    _id: string;
    title: string;
    content: Chapter[];
    author: Author;
    votes: number;
    imageUrl: string;
}
interface Author {
    id: string;
    name: string;
    bio: string;
    profileImage: string;
}


export default function ContentComponent({ id, story , title}: { id: string, story: Chapter[], title: string }) {
    const [activeTab, setActiveTab] = useState<"read" | "collab" | "leaderboard">("read");
    const router = useRouter();
   const chapters = story.map((chapter, index) => ({
    id: index ,
    title: chapter.title,
    content: chapter.content,
    createdBy: chapter.createdBy,
    likes: 0,     // Default or fetched separately
    liked: false, // Default or fetched separately
  }));
    

    const handleNavCollab = () => {
        router.push(`/collab?id=${encodeURIComponent(id)}&title=${encodeURIComponent(title)}`)
    }

    return (
        <main className="min-h-screen px-6 py-4">
            <nav className="flex items-center justify-between pb-4">
                <div className="flex ">
                    <h1 className="text-2xl font-bold mr-5">Contents •</h1>
                    <ToggleGroup
                        type="single"
                        value={activeTab}
                        onValueChange={(value) => setActiveTab(value as "read" | "collab" | "leaderboard")}
                    >

                        <ToggleGroupItem value="read">Read</ToggleGroupItem>
                        <ToggleGroupItem value="collab">Collab</ToggleGroupItem>
                        <ToggleGroupItem value="leaderboard">Leaderboard</ToggleGroupItem>

                    </ToggleGroup>
                </div>

                <div className="flex items-center gap-2">
                    <Input placeholder="Search" className="w-64" />
                    <Button variant="outline" size="icon">
                        <Filter size={20} />
                    </Button>
                    {activeTab === "collab" && <Button onClick={handleNavCollab}>
                        Create Chapter
                    </Button>}
                </div>
            </nav>

            <section className="mt-6">
                {activeTab === "read" && <ChapterList title ={title} chapters={chapters} id={id} />}
                {activeTab === "collab" && <CollabList id={id} />}
                {activeTab === "leaderboard" && <LeaderboardList title={title} />}
            </section>
        </main>
    );
}

function ChapterList({title,chapters,id }: {title: string, chapters: { id: number; title: string; content: string; createdBy: string | User; likes: number; liked: boolean }[], id: string }) {
    const router = useRouter();
    
const handleNavRead = (chapId: number) => {
    router.push(
      `/read?id=${encodeURIComponent(id)}&title=${encodeURIComponent(title)}&chapId=${encodeURIComponent(chapId)}`
    );
  };
    return (
        <div className="grid gap-6">
            {chapters.map((chapter) => (
                <CardHorizontal  onClick={() => handleNavRead(chapter.id)}
                key={chapter.id} className="p-4 flex items-center justify-between cursor-pointer">
                    <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                        <BookOpen className="w-[50%] h-[50%] object-cover" />
                    </div>

                    <div className="flex-1 pl-4">
                      <h2 className="text-xl font-semibold">{chapter.title}</h2>
                     <p className="text-sm text-gray-500">Created By -
                        {typeof chapter.createdBy === "string"
                          ? chapter.createdBy
                          : chapter.createdBy.name}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-gray-500">{chapter.likes}</span>
                        <Heart className={`text-gray-400 ${chapter.liked ? "fill-red-500 text-red-500" : ""}`} />
                    </div>
                </CardHorizontal>
            ))}
        </div>
    );
}

function CollabList({ id}: { id: string}) {
  const [story, setStory] = useState<Story | null>(null);
  useEffect(() => {
    if (!id) return;

    const getCollabs = async () => {
      try {
        const response = await getStory(id);
        setStory(response); // ✅ No more TS error if types match
      } catch (err) {
        console.error("Failed to fetch story", err);
      }
    };

    getCollabs();
  }, [id]);

  if (!story) return <p>Loading...</p>;

  return (
    <div className="grid gap-6">
      {story.content.map((content) => (
        <CardHorizontal
          key={content._id}
          className="p-4 flex items-center justify-between gap-4 cursor-pointer"
        >
          <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
            <Pencil className="w-[50%] h-[50%] object-cover" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">
            {typeof content.createdBy === "object" && content.createdBy?.name}
            </h2>           
             <p className="text-sm text-gray-500">Contributed on {content.title}</p>
          </div>
        </CardHorizontal>
      ))}
    </div>
  );
}

interface LeaderboardEntry {
  userId: string;
  name: string;
  profilePicture?: string;
  totalScore: number;
}


  function LeaderboardList({ title }: { title: string }) {
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const handleNavAuthor = () => {
    router.push("/author");
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await getLeaderBoard(title); // GET `/leaderboard/:title`
        setLeaderboard(res);
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
      }
    };
    fetchLeaderboard();
  }, [title]);

  return (
    <div className="grid gap-6">
      {leaderboard.map((entry, index) => (
        <CardHorizontal key={entry.userId} className="p-4 flex items-center gap-4">
          <h2 className="text-2xl font-bold">{index + 1}</h2>

          <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden relative">
            <Image
              src={entry.profilePicture || "/default-user.png"}
              alt={entry.name}
              fill
              className="object-cover rounded-full"
            />
          </div>

          <div className="flex-1">
            <p className="text-lg font-semibold">{entry.name}</p>
            <p className="text-sm text-gray-500">
              {entry.totalScore} Contribution{entry.totalScore !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button size="sm">Follow</Button>
            <Button onClick={handleNavAuthor} variant="outline" size="sm">
              Search
            </Button>
          </div>
        </CardHorizontal>
      ))}
    </div>
  );
}
