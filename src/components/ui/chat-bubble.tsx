import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ChatBubbleProps {
  content: string
  isBot: boolean
  timestamp: Date
  isError?: boolean
}

export function ChatBubble({ content, isBot, timestamp, isError }: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex w-full", isBot ? "justify-start" : "justify-end")}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl p-4 shadow-sm",
          isBot
            ? "bg-secondary text-secondary-foreground rounded-tl-none"
            : "bg-primary text-primary-foreground rounded-tr-none",
          isError && "bg-destructive text-destructive-foreground",
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        <span className="text-xs opacity-70 mt-2 block">
          {timestamp.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
        </span>
      </div>
    </motion.div>
  )
}

