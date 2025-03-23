"use client"

import { Button } from "@/components/ui/button"
import ExplorePage from "../../components/exploreComponent"
import { Navbar } from "@/components/Navbar"
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    const handleNavCreate = () => router.push("/create");

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="flex flex-col p-4 sm:p-10 mt-5 ml-5 mr-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-10">
                    <div className="flex flex-col">
                        <div className="text-5xl sm:text-9xl font-bold">
                            Welcome
                        </div>
                        <div className="text-lg sm:text-xl font-bold p-2 sm:p-4 ml-1 sm:ml-3">
                            would you like to start your story?
                        </div>
                    </div>
                    <Button onClick={handleNavCreate} className="text-lg sm:text-xl mt-4 sm:mt-0">
                        Start a Book
                    </Button>
                </div>
                <div className="mt-10 h-px bg-gray-300 my-4 max-w-screen-2xl mx-auto" />
                <div className="pt-10 text-black">
                    <ExplorePage />
                </div>
            </div>
        </main>
    );
}