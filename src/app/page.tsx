"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Bot, Sparkles, Zap, MessageSquare, Clock, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const headerRef = useRef(null)
  const statsRef = useRef(null)
  const { scrollYProgress } = useScroll()

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  useEffect(() => {
    // Header animation
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })

    // Stats animation
    gsap.from(".stat-item", {
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top center",
        end: "bottom center",
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    })
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header
        ref={headerRef}
        className="px-4 lg:px-6 h-14 flex items-center fixed w-full bg-gray-400 backdrop-blur-md z-50"
      >
        <Link className="flex items-center justify-center" href="/">
          <Sparkles className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">Summup</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/summarize">
            Summarize
          </Link>
        </nav>
      </header>
      <main className="flex-1 pt-14">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-gray-50">
          <motion.div style={{ opacity, scale }} className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Transform Text into
                  <span className="text-primary block mt-2">Brilliant Summaries</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Harness the power of AI to distill complex content into clear, concise summaries in seconds.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-x-4"
              >
                <Link href="/summarize">
                  <Button size="lg" className="inline-flex items-center">
                    Try Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section ref={statsRef} className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-3 items-start">
              <Card className="stat-item p-6 bg-white shadow-lg">
                <div className="flex flex-col items-center space-y-2">
                  <MessageSquare className="h-12 w-12 text-primary" />
                  <h3 className="text-2xl font-bold">1M+</h3>
                  <p className="text-center text-gray-500">Summaries Generated</p>
                </div>
              </Card>
              <Card className="stat-item p-6 bg-white shadow-lg">
                <div className="flex flex-col items-center space-y-2">
                  <Clock className="h-12 w-12 text-primary" />
                  <h3 className="text-2xl font-bold">3 Sec</h3>
                  <p className="text-center text-gray-500">Average Processing Time</p>
                </div>
              </Card>
              <Card className="stat-item p-6 bg-white shadow-lg">
                <div className="flex flex-col items-center space-y-2">
                  <Check className="h-12 w-12 text-primary" />
                  <h3 className="text-2xl font-bold">99%</h3>
                  <p className="text-center text-gray-500">Accuracy Rate</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-3 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center space-y-4 text-center"
              >
                <Bot className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">Advanced AI</h3>
                <p className="text-gray-500 dark:text-gray-400">Powered by state-of-the-art language models</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center space-y-4 text-center"
              >
                <Sparkles className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">Accurate Summaries</h3>
                <p className="text-gray-500 dark:text-gray-400">Get concise yet comprehensive summaries</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col items-center space-y-4 text-center"
              >
                <Zap className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">Lightning Fast</h3>
                <p className="text-gray-500 dark:text-gray-400">Get results in seconds, not minutes</p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-white">
        <div className="container flex flex-auto justify-between gap-4 py-6 px-4 md:px-6">
          <p className="text-xs text-center sm:text-left text-gray-500 dark:text-gray-400">
            © 2024 Summup. Created by Uday Bhangare, Aditya Bendal, Soumit Das, Ved Alve
          </p>
          <nav className="flex justify-center sm:justify-start gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

