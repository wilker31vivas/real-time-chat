export default function MessageList({ messages }) {
  return (
    <ul className="flex flex-col gap-2 px-4 py-3 overflow-y-auto">
      {messages.map((message, idx) => (
        <Message key={idx} msg={message.msg} username={message.user} />
      ))}
    </ul>
  );
}

function Message({ msg, username }) {
  return (
    <li className={`flex flex-col max-w-[75%] gap-1 ${isOwn ? "self-end items-end" : "self-start items-start"}`}>

      {!isOwn && (
        <span className="text-[0.68rem] font-semibold text-indigo-400 uppercase tracking-widest px-1">
          {username}
        </span>
      )}

      <div
        className={`
          relative px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words shadow-sm
          ${isOwn
            ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-br-sm shadow-[0_2px_12px_rgba(99,102,241,0.35)]"
            : "bg-white/[0.06] text-white/85 border border-white/[0.07] rounded-bl-sm"
          }
        `}
      >
        {msg}
      </div>

    </li>
  );
}