import { useChat } from '../hooks/useChat'
import MessageList from './MessageList'
import ChatForm from './ChatForm'

export default function ChatApp() {
  const { messages, sendMessage } = useChat()

  return (
    <section className="flex flex-col h-screen bg-[#0a0a0f] relative overflow-hidden">

      <div className="absolute w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-3xl top-[-80px] left-[-80px] pointer-events-none" />
      <div className="absolute w-[380px] h-[380px] rounded-full bg-purple-500/10 blur-3xl bottom-[-60px] right-[-40px] pointer-events-none" />

      <div className="relative z-10 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <MessageList messages={messages} />
      </div>

      {/* Input area */}
      <div className="relative z-10 px-4 py-3 border-t border-white/[0.06] bg-white/[0.02] backdrop-blur-sm shrink-0">
        <ChatForm onSendMessage={sendMessage} />
      </div>

    </section>
  )
}