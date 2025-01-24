"use client"

import { SignUp } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function SignUpPage() {
  const headerRef = useRef(null)

  useEffect(() => {
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header
        ref={headerRef}
        className="px-4 lg:px-6 h-14 flex items-center fixed w-full bg-white/80 backdrop-blur-md z-50"
      >
        <Link className="flex items-center justify-center" href="/">
          <Sparkles className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">Summup</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center pt-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-6"
        >
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
                card: "bg-white shadow-lg",
                headerTitle: "text-2xl font-bold",
                headerSubtitle: "text-gray-500",
                socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50",
                formFieldLabel: "text-gray-700",
                formFieldInput: "border-gray-300 focus:border-primary focus:ring-primary",
                footerActionLink: "text-primary hover:text-primary/90",
              },
            }}
          />
        </motion.div>
      </main>
    </div>
  )
}

