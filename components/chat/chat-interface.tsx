"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, Send, Paperclip } from "lucide-react"

interface ChatInterfaceProps {
  onClose: () => void
}

interface Message {
  id: number
  sender: "user" | "lawyer" | "client"
  text: string
  timestamp: Date
}

export default function ChatInterface({ onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "client",
      text: "Hello, I have a question about my case.",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: 2,
      sender: "lawyer",
      text: "Hi there! I'd be happy to help. What would you like to know?",
      timestamp: new Date(Date.now() - 3540000),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const message: Message = {
      id: messages.length + 1,
      sender: "lawyer",
      text: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate client response after a delay
    setTimeout(() => {
      const clientResponse: Message = {
        id: messages.length + 2,
        sender: "client",
        text: "Thank you for the information. I'll review it and get back to you if I have more questions.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, clientResponse])
    }, 3000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-primary text-white p-3 flex justify-between items-center">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Client" />
            <AvatarFallback>CL</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-sm">Michael Thompson</h3>
            <p className="text-xs opacity-80">Online</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-primary-foreground/20">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "lawyer" ? "justify-end" : "justify-start"}`}>
            {message.sender !== "lawyer" && (
              <Avatar className="h-8 w-8 mr-2 mt-1">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Client" />
                <AvatarFallback>CL</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === "lawyer" ? "bg-primary text-primary-foreground" : "bg-gray-100 text-gray-800"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs mt-1 opacity-70 text-right">{formatTime(message.timestamp)}</p>
            </div>
            {message.sender === "lawyer" && (
              <Avatar className="h-8 w-8 ml-2 mt-1">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Lawyer" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-3 flex items-center">
        <Button variant="ghost" size="icon" className="text-gray-500">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage()
          }}
          className="flex-1 mx-2 focus-visible:ring-primary"
        />
        <Button size="icon" onClick={handleSendMessage} disabled={newMessage.trim() === ""}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
