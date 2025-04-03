"use client"

import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { createAIStory } from "@/api/aiApi";
import { useState } from "react";   

export default function CreatePage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return null; // No file selected

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (data.success) {
                return data.filePath; // Return relative file path
            } else {
                alert("File upload failed!");
                return null;
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            return null;
        }
    };

    const handleCreate = async () => {
        try {
            const imageUrl = await handleUpload(); // Upload file and get URL

            if (!imageUrl) {
                alert("Please upload a cover image!");
                return;
            }

            const response = await createAIStory(title, description);
                          console.log("AI response:", response); // Log the AI response 
            if (response) {
                // Navigate to AIPage with the generated story
                router.push(`/aiPage?story=${encodeURIComponent(response.suggestion)},&title=${encodeURIComponent(title)},&imageUrl=${encodeURIComponent(imageUrl)}`);  
            } else {
                alert("AI generation failed!");
            }
        } catch (error) {
            console.log("Error creating story:", error);
        }
    };

    return (
        <main className="bg-white min-h-screen">
            <Navbar />
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-center p-10">
                <Card className="w-full max-w-4xl p-12">
                    <CardHeader>
                        <CardTitle className="text-3xl">Create your Story</CardTitle>
                        <CardDescription>
                            Start your dreams of becoming a writer
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Title</Label>
                            <Input id="name" type="text" placeholder="Story Title" 
                                value={title} onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Description</Label>
                            <Textarea className="h-32" id="desc" placeholder="Story Description"
                                value={description} onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="picture">Cover (picture)</Label>
                            <Input id="picture" type="file" accept="image/*" onChange={handleFileChange} />
                        </div>
                    </CardContent>

                    <CardFooter className="pt-4 flex flex-col gap-5">
                        <Button onClick={handleCreate} className="w-full py-3 text-lg">Create</Button>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
}
