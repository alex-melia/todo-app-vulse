import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import Navbar from "@/components/layout/Navbar"
import { getCurrentUser } from "@/actions/Auth"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Todo App",
  description: "ToDo, set your priorities straight.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={cn("min-h-screen container", inter.className)}>
        <Navbar currentUser={currentUser} />
        <Toaster />
        <main className="flex flex-col">{children}</main>
      </body>
    </html>
  )
}
