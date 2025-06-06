import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CardHorizontal } from "./ui/card";
import Image from "next/image";
import { getUserStories } from "@/api/storyApi"; // corrected path

// Interfaces
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
interface Author {
  id: string;
  name: string;
  bio: string;
  profileImage: string;
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

export default function UserStories() {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const storiesData = await getUserStories();
        console.log("ofod", storiesData)
        if (storiesData) {
          setStories(storiesData);
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="grid gap-6">
      {stories.map((story) => {
        const wordCount = story.content?.reduce(
          (acc, chapter) => acc + chapter.content.split(" ").length,
          0
        );

        return (
          <CardHorizontal key={story._id} className="p-6 flex items-center justify-between">
            <div className="flex-1 pr-4">
              <p className="text-m text-gray-500"> Unknown Genre</p>
              <h2 className="text-xl font-semibold">{story.title}</h2>
              <p className="text-m text-gray-500">
                {wordCount.toLocaleString()} words - {story.content.length} Chapters
              </p>
              <p className="text-m text-gray-700">by {story.author.name}</p>
              <div className="flex gap-1.5">
                <Button className="mt-2">Edit</Button>
                <Button className="mt-2">Delete</Button>
              </div>
            </div>

            <div className="w-128 h-58 flex-shrink-0 bg-gray-300 rounded-lg overflow-hidden relative">
              <Image
                src={story.imageUrl}
                alt={story.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </CardHorizontal>
        );
      })}
    </div>
  );
}
