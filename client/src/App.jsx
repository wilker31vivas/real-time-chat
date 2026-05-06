import ChatApp from './components/ChatApp'
import Login from './components/Login'
import { useAuth } from './hooks/useAuth'
import { useChat } from './hooks/useChat'
import { useState } from 'react'

export default function App() {
  const { messages, sendMessage } = useChat()
  const { setUser } = useAuth()

  const [isUserExist, setIsUserExist] = useState(() => !!localStorage.getItem("user"));

  const handleLogin = async (name) => {
    await setUser(name);
    setIsUserExist(true);
  }

  return (
    <>
      {isUserExist ? <ChatApp messages={messages} sendMessage={sendMessage} /> : <Login setUser={handleLogin} />}
    </>
  )
}
