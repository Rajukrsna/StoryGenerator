"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const router = useRouter();

    const handleNavHome = () => router.push("/homepage");
    const handleNavProfile = () => router.push("/profile");

    return (
        <nav className="flex items-center justify-between border-b px-8 py-4 bg-white">
            <div className="text-xl font-bold">StoryTime</div>
            <div>
                <Button onClick={handleNavHome} variant="link" className="text-sm hover:underline">
                    Home
                </Button>
                <Button onClick={handleNavProfile} variant="link" className="text-sm hover:underline">
                    Profile
                </Button>
            </div>
        </nav>
    );
}
