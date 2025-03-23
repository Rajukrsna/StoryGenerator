import ContentComponent from "@/components/contentComponent";
import { Navbar } from "@/components/Navbar";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";


export default function BookPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="flex-col items-center ">
                <div className="bg-gray-300 w-full flex items-center pb-10">
                    <div className="m-10 p-6 flex flex-col">
                        <h1 className="text-7xl font-bold pb-5">The Dragon Story</h1>
                        <h2 className="pl-3 text-2xl">by Author</h2>
                        <div className="flex gap-1.5 pl-3">
                            <div className="flex flex-col items-center">
                                <ArrowBigUp size={30} className="rounded-full bg-gray-400 mt-2" />
                                <h1>123</h1>
                            </div>
                            <div className="flex flex-col items-center">
                                <ArrowBigDown size={30} className="mt-2" />
                                <h1>67</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10 h-px bg-gray-300 my-4 max-w-screen-2xl mx-auto" />
                <div className="text-black p-10">
                    <ContentComponent></ContentComponent>
                </div>
            </div>
        </main>
    )
}