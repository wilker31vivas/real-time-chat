import { useState } from 'react'

export default function ChatForm({ onSendMessage }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input)
      setInput('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2.5 px-4 py-3"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write a message..."
        autoComplete="off"
        className="
          flex-1 px-4 py-2.5 rounded-xl
          bg-white/[0.06] border border-white/10
          text-white/90 text-sm placeholder:text-white/25
          outline-none transition-all duration-200
          focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20
        "
      />

      <button
        type="submit"
        disabled={!input.trim()}
        className="
          w-10 h-10 rounded-xl shrink-0
          bg-gradient-to-br from-indigo-500 to-purple-500
          flex items-center justify-center
          shadow-[0_3px_12px_rgba(99,102,241,0.4)]
          hover:opacity-90 hover:-translate-y-px
          active:scale-95
          disabled:opacity-30 disabled:cursor-not-allowed disabled:translate-y-0
          transition-all duration-150 cursor-pointer
        "
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 2L15 22L11 13L2 9L22 2z" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  )
}