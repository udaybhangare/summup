import { Bot } from "lucide-react"
import { motion } from "framer-motion"

export function ChatHeader() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between p-4 border-b bg-card"
    >
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">AI Summarizer</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">Online</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

