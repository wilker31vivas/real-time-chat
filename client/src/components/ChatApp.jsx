import { useChat } from '../hooks/useChat'
import MessageList from './MessageList'
import ChatForm from './ChatForm'

export default function ChatApp() {
  const { messages, sendMessage } = useChat()

  return (
    <section className="chat">
      <MessageList messages={messages} />
      <ChatForm onSendMessage={sendMessage} />
    </section>
  )
}
