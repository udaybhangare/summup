import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import {
  ClerkProvider,
  // SignInButton,
  // SignedIn,
  // SignedOut,
  // UserButton
} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Summup - AI Text Summarization",
  description: "Transform lengthy content into concise, meaningful summaries with our advanced AI technology.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
        {/* <SignedOut>
            <SignInButton />
          </SignedOut> */}
          {/* <SignedIn>
            <UserButton />
          </SignedIn> */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

