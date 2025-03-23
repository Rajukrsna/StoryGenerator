"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signup } from "@/api/signup"

export default function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState("/profile-picture-placeholder.svg");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
    
            // Convert to Base64
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setProfilePicture(reader.result as string); // Store Base64 string
            };
        }
    };
    

    const handleSignUp = async () => {
        try {
            await signup(name, email, password, profilePicture);
            router.push("/homepage");
        } catch (error) {
            console.error("Sign-up failed", error);
            setError("Sign-up failed. Please check your details and try again.");
        }
    };

    const handleNavigation = () => {
        router.push("/");
    };

    return (
        <main className="min-h-screen bg-white">
            <nav className="flex items-center justify-between border-b px-4 sm:px-8 py-4">
                <div className="text-lg sm:text-xl font-bold">StoryTime</div>
                <Button onClick={handleNavigation} variant="link" className="text-sm hover:underline">
                    Login
                </Button>
            </nav>

            <section className="mx-auto flex max-w-md flex-col items-center justify-center p-4 sm:p-1">
                <Card className="w-full mt-10">
                    <CardHeader>
                        <CardTitle className="text-xl sm:text-2xl">Sign Up to your Account</CardTitle>
                        <CardDescription>
                            Enter in your name, email and password to Sign Up
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="relative h-20 w-20 overflow-hidden rounded-full bg-gray-300">
                                <img
                                    src={previewUrl}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </div>
                            <input
                                type="file"
                                id="profile-picture"
                                className="sr-only"
                                onChange={handleFileChange}
                            />
                            <div className="text-black text-m">
                                Profile Picture
                            </div>
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSignUp} className="w-full mt-5">Sign Up</Button>
                    </CardFooter>
                </Card>
            </section>
        </main>
    )
}