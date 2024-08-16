import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { LoginButton } from "@/components/login-button"
import { auth } from "@/auth"
import Link from "next/link"
import { ProfileDropdown } from "@/components/profile-dropdown"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Icetea Accounts",
  description: "Generated by create next app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <body className={GeistSans.className + " dark"}>
        <header className="sticky top-0 z-50 -mb-px flex items-center justify-between border-b border-gray-800 px-8 py-2 backdrop-blur">
          <Link href={"/"}>
            <h1 className="text-4xl font-bold">Ice tea accounts</h1>
          </Link>
          <div className="flex items-center gap-4">
            {session?.user ? (
              <ProfileDropdown session={session} />
            ) : (
              <LoginButton />
            )}
          </div>
        </header>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
