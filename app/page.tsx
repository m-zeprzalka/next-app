"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/themeToogle"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useEffect, useState } from "react"

export default function Home() {
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionData = await authClient.getSession()
        setSession(sessionData?.data || null)
      } catch (error) {
        console.error("Session error:", error)
        setSession(null)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setSession(null)
          router.push("/")
          toast.success("Signed out successfully!")
        },
      },
    })
  }

  if (loading) {
    return (
      <div className="p-12">
        <h1 className="text-6xl py-4">Loading...</h1>
      </div>
    )
  }

  return (
    <div className="p-12">
      <h1 className="text-6xl py-4">Hello</h1>
      <ThemeToggle />
      {session ? (
        <div>
          <p>{session.user.name}</p>
          <Button onClick={signOut}>Logout</Button>
        </div>
      ) : (
        <Button onClick={() => router.push("/login")}>Login</Button>
      )}
    </div>
  )
}
