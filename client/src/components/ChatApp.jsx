import { useChat } from '../hooks/useChat'
import MessageList from './MessageList'
import ChatForm from './ChatForm'

export default function ChatApp() {
  const { messages, sendMessage } = useChat()

  return (
    <section className="flex flex-col h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} />
      </div>
      <div className="border-t border-slate-700">
        <ChatForm onSendMessage={sendMessage} />
      </div>
    </section>
  )
}
