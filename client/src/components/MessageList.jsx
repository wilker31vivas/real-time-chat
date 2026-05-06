export default function MessageList({ messages }) {
  return (
    <ul className="flex flex-col gap-2 px-4 py-3 overflow-y-auto">
      {messages.map((message, idx) => (
        <Message key={idx} msg={message.msg} username={message.user.name} avatar={message.user.avatar} />
      ))}
    </ul>
  );
}

function Message({ msg, username, avatar }) {
  return (
    <li className={`flex flex-col max-w-[75%] gap-1 self-start items-start`}>

      <span className="text-[0.68rem] font-semibold text-indigo-400 uppercase tracking-widest px-1">
        {username}
      </span>

      <img src={avatar} alt="" className="h-5 w-5" />

      <div
        className={`
          relative px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words shadow-sm
            bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-br-sm shadow-[0_2px_12px_rgba(99,102,241,0.35)
        `}
      >
        {msg}
      </div>

    </li>
  );
}