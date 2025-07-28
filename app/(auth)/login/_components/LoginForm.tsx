"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Github, Loader, Send } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const router = useRouter()
  const [githubPending, startGitHubTransition] = useTransition()
  const [emailPending, startEmailTransition] = useTransition()
  const [email, setEmail] = useState("")

  async function signInWithGitHub() {
    startGitHubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Successfully signed in with GitHub!")
          },
          onError: (error) => {
            toast.error("Internal Server Error")
          },
        },
      })
    })
  }

  function signWithEmail() {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Verification email sent! Please check your inbox.")
            router.push(`/verify-request?email=${email}`)
          },
          onError: () => {
            toast.error("Failed to send verification email. Please try again.")
          },
        },
      })
    })
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Welcome back!</CardTitle>
        <CardDescription className="text-sm">
          Login with your GitHub or Email Account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button
          disabled={githubPending}
          onClick={signInWithGitHub}
          className="w-full"
          variant={"outline"}
        >
          {githubPending ? (
            <>
              <Loader className="size animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <Github />
              Sign in with GitHub
            </>
          )}
        </Button>
        <div className="relative text-center text-sm p-2 after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Or continue with login
          </span>
        </div>
        <div className="grid gap-3">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <Button onClick={signWithEmail} disabled={emailPending}>
            {emailPending ? (
              <>
                <Loader className="size-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <Send className="size-4" />
                <span>Continue with Email</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
