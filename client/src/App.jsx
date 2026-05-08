import ChatApp from './components/ChatApp'
import Login from './components/Login'
import { useAuth } from './hooks/useAuth'
import { useChat } from './hooks/useChat'
import { useState } from 'react'

export default function App() {
  const { user, setUser } = useAuth()       // 👈 única instancia de useAuth
  const { messages, sendMessage } = useChat(user)

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return <ChatApp messages={messages} sendMessage={sendMessage} />
}
