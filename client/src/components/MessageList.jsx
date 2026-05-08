import { useEffect } from "react";

export default function MessageList({ messages }) {
  return (
    <ul className="flex flex-col gap-2 px-4 py-3 overflow-y-auto">
      {messages.map((message, idx) => (
        <Message key={idx} msg={message.msg} username={message.username} avatar={message.avatar} />
      ))}
    </ul>
  );
}

function Message({ msg, username, avatar }) {
  const isOwn = () => {
    const stored = localStorage.getItem("user");
    const user = JSON.parse(stored)
    return user.username === username
  };
  
  return (
    <li className={`flex items-end gap-2 max-w-[75%] ${isOwn() ? "self-end flex-row-reverse" : "self-start flex-row"}`}>
 
      {!isOwn() && (
        <img
          src={avatar}
          alt={username}
          className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0 mb-0.5"
        />
      )}
 
      <div className={`flex flex-col gap-1 ${isOwn()  ? "items-end" : "items-start"}`}>
        {!isOwn()  && (
          <span className="text-[0.68rem] font-semibold text-indigo-400 uppercase tracking-widest px-1">
            {username}
          </span>
        )}
 
        <div
          className={`
            px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words shadow-sm
            ${isOwn() 
              ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-br-sm shadow-[0_2px_12px_rgba(99,102,241,0.35)]"
              : "bg-white/[0.06] text-white/85 border border-white/[0.07] rounded-bl-sm"
            }
          `}
        >
          {msg}
        </div>
      </div>
 
    </li>
  )
}