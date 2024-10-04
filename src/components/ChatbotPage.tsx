"use client"

import { useState, useEffect, useRef } from 'react'
import { Message as TMessage, useChat } from 'ai/react'
import { Send, Bot, User, ArrowLeft, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface ChatbotPageProps {
  sessionId: string
  initialMessages: TMessage[]
  websiteUrl: string
}

export default function ChatbotPage({ sessionId, initialMessages, websiteUrl }: ChatbotPageProps) {
  const [error, setError] = useState<string | null>(null)
  const { messages, handleInputChange, handleSubmit, input, setInput, isLoading } = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
    initialMessages,
    onError: (error) => {
      console.error("Chat error:", error)
      setError("An error occurred while processing your request. Please try again.")
    }
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await handleSubmit(e)
    } catch (error) {
      console.error("Form submission error:", error)
      setError("Failed to send message. Please try again.")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Chat with {websiteUrl}</h1>
        </div>
      </header>

      <main className="flex-grow flex flex-col max-w-3xl mx-auto w-full p-4">
        <div className="flex-grow overflow-y-auto mb-4 bg-white rounded-lg shadow-md">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Bot className="h-12 w-12 mb-4" />
              <p className="text-lg font-medium">Start your conversation</p>
              <p className="text-sm">Ask anything about the website</p>
            </div>
          ) : (
            messages.map((message, i) => (
              <div
                key={i}
                className={`p-4 ${
                  message.role === 'user' ? 'bg-blue-50' : 'bg-white'
                }`}
              >
                <div className="flex items-start">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="h-5 w-5 text-white" />
                    ) : (
                      <Bot className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div className="ml-3 text-sm">
                    <p className={`font-medium ${
                      message.role === 'user' ? 'text-blue-700' : 'text-gray-900'
                    }`}>
                      {message.role === 'user' ? 'You' : 'AI'}
                    </p>
                    <p className="mt-1 text-gray-700">{message.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="p-4 bg-white">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3 text-sm">
                  <p className="font-medium text-gray-900">AI</p>
                  <div className="mt-2 flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleFormSubmit} className="sticky bottom-0 flex items-center mt-4">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 text-gray-800 placeholder-gray-500 transition-colors duration-200 ease-in-out hover:bg-blue-100 focus:bg-white"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </main>

      <footer className="bg-white shadow-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-500">
          Powered by AI - Chat with any website content
        </div>
      </footer>
    </div>
  )
}