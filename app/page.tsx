import { ThemeToggle } from "@/components/ui/themeToogle"
import Image from "next/image"

export default function Home() {
  return (
    <div>
      <h1 className="text-6xl py-4">Hello</h1>
      <ThemeToggle />
    </div>
  )
}
