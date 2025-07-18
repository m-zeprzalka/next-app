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

import { Github, Loader } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useTransition } from "react"

export default function LoginPage() {
  const [githubPending, startGitHubTransition] = useTransition()

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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Welcome back!</CardTitle>
        <CardDescription className="text-sm">
          Login with your credentials to access your account.
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
            <Input type="email" placeholder="m@example.com" />
          </div>
          <Button>Continue with email</Button>
        </div>
      </CardContent>
    </Card>
  )
}
