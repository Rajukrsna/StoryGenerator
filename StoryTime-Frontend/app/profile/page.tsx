"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserStories from "@/components/userStories";
import Image from "next/image";
import { getMyProfile } from "@/api/profile";
import { updateMyProfile } from "@/api/profile";
import {updateProfileImage} from "@/api/profile";

interface Contribution {
  title: string;
  score: number;
}
interface User {
  _id: string;
  name: string;
  email?: string;
  bio?: string;
  profilePicture?: string;
  contributions?: Contribution[];  // ← updated from `Number` to `Contribution[]`
}


export default function ProfilePage() {
  const [profile, setProfile] = useState<User | null>(null);
  const [preview, setPreview] = useState<string>("/profile-picture-placeholder.svg");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filepath, setSelectedFilePath] = useState<string>("");
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getMyProfile();
        console.log(response)
        setProfile(response);
        if (response.profilePicture) setPreview(response.profilePicture);

      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    try {
      const { filePath } = await updateProfileImage(file);
      console.log("Image uploaded to:", filePath);
      setSelectedFile(file);
      setSelectedFilePath(filePath);
      setPreview(URL.createObjectURL(file));
    } catch (err) {
      console.error("Upload failed", err);
    }
  }
};
const handleUpload = async () => {
    if (!selectedFile || !profile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", profile.name);
    formData.append("email", profile.email||"No email found");
    if (profile.bio) formData.append("bio", profile.bio);

      const updated = await updateMyProfile({
        ...profile,
        profilePicture: filepath, // e.g., "/uploads/myimg.jpg"
      });
      setProfile(updated);
      alert("Profile picture updated!");
  };
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="flex-col items-center p-10">
        <div className="flex items-center gap-10">
          {/* Profile Picture */}
          <div className="flex flex-col items-center text-center mr-10 w-1/3">
            <div className="relative w-40 h-40 overflow-hidden rounded-full bg-gray-300 mb-4">
              <Image
                src={preview}
                alt="Profile Picture"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            <Button variant="link"  onClick={handleUpload}>Change Profile Picture</Button>
            <h1 className="text-sm text-gray-600">Choose a picture to show</h1>
          </div>

          <div className="w-px bg-gray-300 h-48 my-4" />

          {/* Profile Form */}
          <div className="w-2/3 flex justify-center ml-10">
            <Card className="w-full max-w-lg p-6">
              <CardHeader>
                <CardTitle className="text-2xl">User Account</CardTitle>
                <CardDescription>
                  Enter your name and email to edit your profile
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder={profile?.name || "Name"} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder={profile?.email || "Email"} />
                </div>
              </CardContent>

              <CardFooter className="pt-4 flex flex-col gap-5">
                <Button className="w-full py-3 text-lg">Update Account</Button>
                <Button className="w-full py-3 text-lg">Sign Out</Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="p-10">
          <h1 className="text-4xl font-bold pt-10 pb-4">Your Stories</h1>
          <UserStories />
        </div>
      </div>
    </main>
  );
}
