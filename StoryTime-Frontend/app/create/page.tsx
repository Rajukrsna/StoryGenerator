"use client"

import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";


export default function CreatePage() {

    const router = useRouter();

    const handleCreate = () => {
        router.push("/book");
    }

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
                            <Input id="name" type="text" placeholder="Story Title" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Description</Label>
                            <Textarea className="h-32" id="desc" placeholder="Story Description" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Cover (picture)</Label>
                            <Input id="picture" type="file" placeholder="Story Cover" />
                        </div>
                    </CardContent>

                    <CardFooter className="pt-4 flex flex-col gap-5">
                        <Button onClick={handleCreate} className="w-full py-3 text-lg">Create</Button>
                    </CardFooter>
                </Card>
            </div>
        </main>
    )
}