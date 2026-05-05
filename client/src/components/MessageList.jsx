export default function MessageList({ messages }) {
  return (
    <ul className="space-y-3 p-4">
      {messages.map((message, idx) => (
        <Message key={idx} msg={message.msg} username={message.user} />
      ))}
    </ul>
  )
}

function Message({ msg, username }) {
  return (
    <li className="bg-slate-700 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200">
      <p className="text-white text-sm leading-relaxed break-words">{msg}</p>
      <small className="text-slate-400 text-xs mt-2 block">{username}</small>
    </li>
  )
}
