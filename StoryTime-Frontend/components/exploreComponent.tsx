"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardHorizontal } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Filter, ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useRouter } from "next/navigation";

const stories = [
    {
        id: 1,
        title: "The Dragon Story",
        genre: "Fantasy",
        wordCount: 123000,
        chapters: 3,
        author: "John Doe",
        coverImage: "/placeholder-story.jpg",
    },
    {
        id: 2,
        title: "The Lost Kingdom",
        genre: "Adventure",
        wordCount: 98000,
        chapters: 5,
        author: "Jane Smith",
        coverImage: "/placeholder-story2.jpg",
    },
    {
        id: 3,
        title: "Cybernetic Dawn",
        genre: "Sci-Fi",
        wordCount: 150000,
        chapters: 7,
        author: "Mark Lee",
        coverImage: "/placeholder-story3.jpg",
    },
];

const authors = [
    {
        id: 1,
        name: "John Doe",
        bio: "Fantasy writer and world-builder, creating epic tales.",
        profileImage: "/placeholder-author.jpg",
    },
    {
        id: 2,
        name: "Jane Smith",
        bio: "Adventure enthusiast, weaving thrilling narratives.",
        profileImage: "/placeholder-author2.jpg",
    },
    {
        id: 3,
        name: "Mark Lee",
        bio: "Sci-fi expert, crafting futuristic and cyberpunk worlds.",
        profileImage: "/placeholder-author3.jpg",
    },
];

export default function ExplorePage() {
    const [activeTab, setActiveTab] = useState<"stories" | "authors">("stories");

    return (
        <main className="min-h-screen px-4 py-4 md:px-6">

            {/* Navigation */}
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

                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                    <Input placeholder="Search" className="flex-1 w-full sm:w-64" />
                    <Button variant="outline" size="icon">
                        <Filter size={20} />
                    </Button>
                </div>
            </nav>

            {/* Content Section */}
            <section className="mt-6">
                {activeTab === "stories" ? <StoriesList /> : <AuthorsList />}
            </section>
        </main>
    );
}

/* Stories List */
function StoriesList() {
    const router = useRouter();
    const handleNavBook = () => {
        router.push("/book");
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
                <CardHorizontal key={story.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <div className="flex-1 pr-0 sm:pr-4">
                        <p className="text-sm text-gray-500">{story.genre}</p>
                        <h2 className="text-lg sm:text-xl font-semibold">{story.title}</h2>
                        <p className="text-sm text-gray-500">
                            {story.wordCount.toLocaleString()} words - {story.chapters} Chapters
                        </p>
                        <p className="text-sm text-gray-700">by {story.author}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <Button onClick={handleNavBook}>Read Now</Button>
                            <div className="flex flex-row sm:flex-col items-center">
                                <ArrowBigUp size={24} className="rounded-full bg-gray-400 p-1" />
                                <span className="text-sm">123</span>
                            </div>
                            <div className="flex flex-row sm:flex-col items-center">
                                <ArrowBigDown size={24} className="p-1" />
                                <span className="text-sm">67</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full sm:w-40 h-40 sm:h-58 bg-gray-300 rounded-lg overflow-hidden mt-4 sm:mt-0">
                        <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover" />
                    </div>
                </CardHorizontal>
            ))}
        </div>
    );
}

/* Authors List */
function AuthorsList() {
    const router = useRouter();
    const handleNavAuthor = () => {
        router.push("/author");
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author) => (
                <CardHorizontal key={author.id} className="p-4 flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="w-24 h-24 sm:w-40 sm:h-40 bg-gray-300 rounded-full overflow-hidden mx-auto sm:mx-0">
                        <img src={author.profileImage} alt={author.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 text-center text-left sm:text-left">
                        <h2 className="text-lg sm:text-xl font-semibold">{author.name}</h2>
                        <p className="text-sm text-gray-500">{author.bio}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
                        <Button size="lg" className="w-full sm:w-32">Follow</Button>
                        <Button onClick={handleNavAuthor} variant="outline" size="lg" className="w-full sm:w-32">
                            Search
                        </Button>
                    </div>
                </CardHorizontal>
            ))}
        </div>
    );
}
