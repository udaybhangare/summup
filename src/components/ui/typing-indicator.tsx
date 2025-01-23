import { motion } from "framer-motion"

export function TypingIndicator() {
  return (
    <div className="flex justify-start w-full">
      <div className="bg-secondary rounded-2xl rounded-tl-none p-4 shadow-sm max-w-[80px]">
        <motion.div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{
                y: ["0%", "-50%", "0%"],
              }}
              transition={{
                duration: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.15,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

