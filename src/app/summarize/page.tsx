"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {  Send,  Sparkles } from "lucide-react"
// Mic, Image, Paperclip,
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChatBubble } from "@/components/ui/chat-bubble"
import { TypingIndicator } from "@/components/ui/typing-indicator"
import { ChatHeader } from "@/components/ui/chat-header"
import { CustomUserButton } from "@/components/ui/custom-user-button"

interface Message {
  id: string
  content: string
  isBot: boolean
  timestamp: Date
  isError?: boolean
}

export default function SummarizePage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "👋 Hi! I'm your AI summarization assistant. Paste any text you'd like me to summarize, and I'll help you extract the key points.",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/v2/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input,
          output_language: "en",
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      if (data.summary) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.summary.parts[0].text,
          isBot: true,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
        isBot: true,
        timestamp: new Date(),
        isError: true,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="container max-w-4xl mx-auto p-4 py-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl overflow-hidden border bg-card shadow-xl"
      >
        <div className="flex flex-col h-[700px]">
          <div className="flex justify-between items-center p-4 border-b">
            <ChatHeader />
            <CustomUserButton />
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                content={message.content}
                isBot={message.isBot}
                timestamp={message.timestamp}
                isError={message.isError}
              />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 border-t bg-card"
          >
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type or paste your text here..."
                  className="pr-10"
                />
                <Sparkles className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
              <div className="flex items-center space-x-2">
                {/* <Button type="button" variant="outline" size="icon" className="rounded-full">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button type="button" variant="outline" size="icon" className="rounded-full">
                  <Image className="h-4 w-4" />
                </Button>
                <Button type="button" variant="outline" size="icon" className="rounded-full">
                  <Mic className="h-4 w-4" />
                </Button> */}
                <Button type="submit" size="icon" className="rounded-full" disabled={!input.trim() || isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

