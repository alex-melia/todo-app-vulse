"use client"

import { signOut } from "@/actions/Auth"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { User } from "@/types"
import toast from "react-hot-toast"

interface NavbarProps {
  currentUser: User
}

export default function Navbar({ currentUser }: NavbarProps) {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  function handleSignOut() {
    startTransition(async () => {
      const { status, message } = await signOut()

      if (status !== "success") {
        if (message) {
          toast.error(message)
        }
      } else {
        router.push("/")
      }
    })
  }

  return (
    <header className="flex w-full pt-4">
      <nav className="flex items-center p-4 border shadow-lg rounded-md w-full">
        <ul className="flex items-center justify-between w-full">
          <a className="font-bold text-2xl" href="/">
            todo.
          </a>
          {!currentUser ? (
            <li>
              <a
                className="bg-black text-white font-bold p-2 rounded-xl"
                href="/signup"
              >
                Sign Up
              </a>
            </li>
          ) : (
            <div className="flex items-center gap-2 sm:gap-8">
              <li>
                <a className=" font-bold p-2 rounded-xl" href="lists">
                  My Lists
                </a>
              </li>
              <li>
                <span
                  className={cn(
                    "bg-black text-white font-bold p-2 rounded-xl hover:cursor-pointer",
                    isPending && "disabled"
                  )}
                  onClick={handleSignOut}
                >
                  Sign Out
                </span>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  )
}
