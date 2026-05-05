export default function MessageList({ messages }) {
  return (
    <ul className="messages">
      {messages.map((message, idx) => (
        <Message key={idx} msg={message.msg} username={message.user} />
      ))}
    </ul>
  )
}

function Message({ msg, username }) {
  return (
    <li>
      <p>{msg}</p>
      <small>{username}</small>
    </li>
  )
}
