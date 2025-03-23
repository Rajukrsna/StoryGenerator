"use client"

import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import UserStories from "@/components/userStories"

export default function ProfilePage() {

    const previewUrl = "/profile-picture-placeholder.svg"

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="flex-col items-center p-10">
                <div className="flex items-center gap-10">

                    <div className="flex flex-col items-center text-center mr-10 w-1/3">
                        <div className="relative h-100 w-100 overflow-hidden rounded-full bg-gray-300 mb-4">
                            <img
                                src={previewUrl}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>
                        <Button variant="link">Change Profile Picture</Button>
                        <h1 className="text-sm text-gray-600">Choose a picture to show</h1>
                    </div>

                    <div className="w-px bg-gray-300 h-48 my-4" />

                    <div className="w-2/3 flex justify-center ml-10">
                        <Card className="w-full max-w-lg p-6">
                            <CardHeader>
                                <CardTitle className="text-2xl">User Account</CardTitle>
                                <CardDescription>
                                    Enter in your name and email to edit your profile
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" type="text" placeholder="John Doe" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="name@example.com" />
                                </div>
                            </CardContent>

                            <CardFooter className="pt-4 flex flex-col gap-5">
                                <Button className="w-full py-3 text-lg">Update Accout</Button>
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

    )
}