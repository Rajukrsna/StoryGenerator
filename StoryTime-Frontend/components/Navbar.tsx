"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export function Navbar() {
    const router = useRouter();

    const handleNavHome = () => router.push("/homepage");
    const handleNavProfile = () => router.push("/profile");
    const handleLogout = ()=>{
         localStorage.removeItem("authToken");
         document.cookie = "authToken=; Max-Age=0; path=/;";
         router.push("/"); 

    }

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
                <Button onClick={handleLogout} variant ="link" className="text-sm hover:underline">
                    Logout
                </Button>
            </div>
        </nav>
    );
}
