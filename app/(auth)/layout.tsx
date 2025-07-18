import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Cuboid } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import Image from "next/image"
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex flex-col min-h-svh w-full items-center justify-center">
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "absolute left-4 top-4",
        })}
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          className="flex items-center self-center gap-2 font-medium"
          href="/"
        >
          {" "}
          <Cuboid />
          BrandMaker
        </Link>
        {children}
        <div className="text-balance text-center text-sm text-muted-foreground">
          Kontynuując logowanie, akceptujesz naszą{" "}
          <span className="hover:text-primary hover:text-underline">
            politykę prywatności
          </span>{" "}
          oraz{" "}
          <span className="hover:text-primary hover:text-underline">
            regulamin
          </span>
          .
        </div>
      </div>
    </div>
  )
}
