"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardHorizontal } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { getStories } from "@/api/storyApi";
import { getAuthors } from "@/api/profile";
import Image from "next/image"; 
import ReactMarkdown from 'react-markdown';

interface Author {
    id: string;
    name: string;
    bio: string;
    profileImage: string;
}
interface Contribution {
  title: string;
  score: number;
}
interface User {
  _id: string;
  name: string;
  email?: string;
  bio?: string;
  profileImage?: string;
  contributions?: Contribution[];  // ← updated from `Number` to `Contribution[]`
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


export default function ExplorePage() {
    const [activeTab, setActiveTab] = useState<"stories" | "authors">("stories");
    const [stories, setStories] = useState<Story[]>([]);
    const [authors, setAuthors] = useState<User[]>([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<'latest' | 'oldest' | 'top'>('latest');
    const [loading, setLoading] = useState<boolean>(true);

            useEffect(() => {
            const fetchData = async () => {
                try {
                setLoading(true);

                if (activeTab === "stories") {
                    const storiesData = await getStories(search, sort);
                   // console.log("Received Stories", storiesData);
                    setStories(storiesData);
                } else {
                    const authorsData = await getAuthors();
                    //console.log("Author data", authorsData);
                    setAuthors(authorsData);
                }

                } catch (error) {
                console.error("Error fetching data:", error);
                } finally {
                setLoading(false);
                }
            };

            fetchData();
            }, [activeTab, search, sort]); // 👈 Add `search` and `sort` to the dependency array


    return (
        <main className="min-h-screen px-4 py-4 md:px-6">
            <nav className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 gap-4">
                <div className="flex flex-col md:flex-row md:items-center">
                    <h1 className="text-2xl font-bold mb-2 md:mb-0 md:mr-5">Explore •</h1>
                    <ToggleGroup
                        type="single"
                        value={activeTab}
                        onValueChange={(value) => setActiveTab(value as "stories" | "authors")}
                        className="flex"
                    >
                        <ToggleGroupItem value="stories">Stories</ToggleGroupItem>
                        <ToggleGroupItem value="authors">Authors</ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <ToggleGroup
                type="single"
                value={sort}
                onValueChange={(value) =>
                    setSort((value as 'latest' | 'oldest' | 'top') || 'latest')
                }
                className="flex"
                >
                <ToggleGroupItem value="latest">Latest</ToggleGroupItem>
                <ToggleGroupItem value="oldest">Oldest</ToggleGroupItem>
                <ToggleGroupItem value="top">Top</ToggleGroupItem>
                </ToggleGroup>

                 <Input
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 w-full sm:w-64"
                    />
                    <Button variant="outline" size="icon">
                        <Filter size={20} />
                    </Button>
                </div>
            </nav>
            <section className="mt-6">
                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : activeTab === "stories" ? (
                    <StoriesList stories={stories} />
                ) : (
                    <AuthorsList authors={authors} />
                )}
            </section>
        </main>
    );
}

function StoriesList({ stories }: { stories: Story[] }) {
    const router = useRouter();
    const handleNavBook = (id: string) => {
        router.push(`/book/${id}` ); // Navigate to the selected book ID
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
                <CardHorizontal key={story._id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div className="relative w-40 h-40"> {/* adjust size */}
        <Image
            src={story.imageUrl || "/uploads/cover.jpg"} 
            alt={story.title} 
            fill
            className="object-cover rounded-full"
        />
        </div>

                <div className="flex-1 pr-0 sm:pr-4">
                    <h2 className="text-lg sm:text-xl font-semibold">{story.title}</h2>
                    <p className="text-sm text-gray-700">
                        by {story.author ? (typeof story.author === "string" ? story.author : story.author.name) : "Unknown"}
                    </p>
                 <div className="text-sm text-gray-600 mt-2 leading-relaxed">
                    <ReactMarkdown>
                        {story.content[0].content.substring(0, 100) + "..."}
                    </ReactMarkdown>
                 </div>

                 <div className="flex flex-wrap gap-2 mt-2">
                        <Button onClick={() => handleNavBook(story._id)}>Read Now</Button>
                 </div>
                </div>
            </CardHorizontal>
            
            
            ))}
        </div>
    );
}


function AuthorsList({ authors }: { authors: User[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author) => (
                <CardHorizontal key={author._id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start">
                    <img
                
                    src={author.profileImage || ""}
                    alt={author.name}
                    className="w-16 h-16 rounded-full object-cover"
                    /> 
                    <div className="ml-4">
                        <h2 className="text-lg font-semibold">{author.name}</h2>
                        <p className="text-sm text-gray-500">{author.bio}</p>
                    </div>
                </CardHorizontal>
            ))}
        </div>
    );
}
