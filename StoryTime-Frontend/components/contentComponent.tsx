"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardHorizontal } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Filter, Heart, Pencil, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";


const collabs = [
    {
        id: 1,
        name: "User 1",
        bio: "Collab writer contributing new chapters.",
        profileImage: "/collab-user-1.png",
    },
    {
        id: 2,
        name: "User 2",
        bio: "Bringing exciting plot twists to the story.",
        profileImage: "/collab-user-2.png",
    },
    {
        id: 3,
        name: "User 3",
        bio: "World-building expert for fantasy settings.",
        profileImage: "/collab-user-3.png",
    },
];

export default function ContentComponent({ story , title}: { story: string, title: string }) {
    const [activeTab, setActiveTab] = useState<"read" | "collab" | "leaderboard">("read");
    const router = useRouter();
    const [chapters, setChapters] = useState([
        { id: 1, title: title, content: story, likes: 123, liked: false }
    ]);
    

    const handleNavCollab = () => {
        router.push("/collab");
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
                {activeTab === "read" && <ChapterList chapters={chapters} />}
                {activeTab === "collab" && <CollabList />}
                {activeTab === "leaderboard" && <LeaderboardList />}
            </section>
        </main>
    );
}

function ChapterList({chapters}: {chapters: { id: number; title: string; content: string; likes: number; liked: boolean }[] }) {
    const router = useRouter();

    const handleNavRead = () => {
        router.push(`/read?chapters=${encodeURIComponent(JSON.stringify(chapters))}`);
    }
    return (
        <div className="grid gap-6">
            {chapters.map((chapter) => (
                <CardHorizontal onClick={handleNavRead} key={chapter.id} className="p-4 flex items-center justify-between cursor-pointer">
                    <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                        <BookOpen className="w-[50%] h-[50%] object-cover" />
                    </div>

                    <div className="flex-1 pl-4">
                        <h2 className="text-xl font-semibold">{chapter.title}</h2>
                        <p className="text-sm text-gray-500">By the Famous Author Pravin</p>
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

function CollabList() {
    const router = useRouter();
    const handleNavCollab = () => {
        router.push("/collab");
    }

    return (
        <div className="grid gap-6">
            {collabs.map((user) => (
                <CardHorizontal onClick={handleNavCollab} key={user.id} className="p-4 flex items-center justify-between gap-4 cursor-pointer">
                    <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
                        <Pencil className="w-[50%] h-[50%] object-cover" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold">{user.name}</h2>
                        <p className="text-sm text-gray-500">{user.bio}</p>
                    </div>
                </CardHorizontal>
            ))}
        </div>
    );
}

function LeaderboardList() {

    const router = useRouter();
    const handleNavAuthor = () => {
        router.push("/author");
    }

    return (

        <div className="grid gap-6">
            {[1, 2, 3].map((rank) => (
                <CardHorizontal key={rank} className="p-4 flex items-center gap-4">

                    <h2 className="text-2xl font-bold">{rank}</h2>


                    <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
                        
                        <Image
  src={`/leaderboard-user-${rank}.png`}
  alt={`User ${rank}`}
  fill
  className="object-cover rounded-full"
/>
                    </div>


                    <div className="flex-1">
                        <p className="text-lg font-semibold">User {rank}</p>
                        <p className="text-sm text-gray-500">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Button size="sm">Follow</Button>
                        <Button onClick={handleNavAuthor} variant="outline" size="sm">Search</Button>
                    </div>
                </CardHorizontal>
            ))}
        </div>
    );
}
