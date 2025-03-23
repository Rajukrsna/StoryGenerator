"use client"

import { Button } from "@/components/ui/button"
import { LoginForm } from "@/components/ui/login-form"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const handleNavigation = () => {
    router.push('/signup')
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="flex items-center justify-end border-b px-4 sm:px-8 py-4">
        <Button onClick={handleNavigation} variant="link" className="text-sm hover:underline">
          Sign up
        </Button>
      </nav>
      <div className="flex flex-col sm:flex-row mt-10 sm:mt-40">
        <section className="flex items-center justify-center p-4sm:p-8 sm:pl-30">
          <div className="mr-4 sm:mr-8 mb-6 h-40 w-40 sm:h-90 sm:w-90 border-2 border-dashed flex items-center justify-center">
            <span className="text-gray-400">Logo</span>
          </div>
          <div>
            <h1 className="mb-2 text-6xl sm:text-9xl font-bold">Story</h1>
            <h1 className="mb-2 text-6xl sm:text-9xl font-bold">Time</h1>
            <p className="text-gray-600 text-lg sm:text-2xl">Time to make your own story</p>
          </div>
        </section>

        <section className="flex items-center justify-center p-4 sm:p-8 sm:pl-50">
          <LoginForm />
        </section>
      </div>
    </main>
  )
}