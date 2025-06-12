"use client"

import { Button } from "@/components/ui/button"
import { LoginForm } from "@/components/ui/login-form"
import { useRouter } from "next/navigation"
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter()

  const handleNavigation = () => {
    router.push('/signup')
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <nav className="flex items-center justify-end border-b px-4 sm:px-8 py-4">
        <Button onClick={handleNavigation} variant="link" className="text-sm hover:underline">
          Sign up
        </Button>
      </nav>

      <div className="flex flex-col sm:flex-row items-center sm:justify-between mt-10 sm:mt-40 px-6 sm:px-20">
        {/* Left Section - Branding */}
        <section className="flex flex-col sm:flex-row items-center sm:items-start sm:pl-32 space-y-4 sm:space-y-0 sm:space-x-8">
         <div className="h-40 w-40 sm:h-48 sm:w-48 flex items-center justify-center">
  <Image
    src="/uploads/StoryMagic.png"
    alt="StoryTime Logo"
    width={192} // 48 * 4
    height={192}
    className="object-contain"
  />
</div>
          <div className="text-center sm:text-left">
            <h1 className="text-5xl sm:text-7xl font-bold leading-tight">Story</h1>
            <h1 className="text-5xl sm:text-7xl font-bold leading-tight">Time</h1>
            <p className="text-gray-600 text-lg sm:text-2xl mt-2">Time to make your own story</p>
          </div>
        </section>

        {/* Right Section - Login Form */}
        <section className="mt-8 sm:mt-0 sm:pl-20 w-full sm:w-auto flex justify-center">
          <LoginForm />
        </section>
      </div>
    </main>
  )
}