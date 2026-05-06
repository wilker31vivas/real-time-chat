import { useState } from 'react'

export default function Login({ setUser }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      setUser(input)
      setInput('')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden px-4 font-sans">

      <div className="absolute w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-3xl top-[-60px] left-[-60px] pointer-events-none" />
      <div className="absolute w-[380px] h-[380px] rounded-full bg-purple-500/10 blur-3xl bottom-[-40px] right-[-20px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm p-8 bg-white/[0.04] border border-white/[0.08] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">

        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-5 shadow-[0_6px_20px_rgba(99,102,241,0.45)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="text-[1.6rem] font-bold text-white/90 tracking-tight leading-tight mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-white/40 mb-7">
          Enter your username to continue chatting
        </p>

        <form className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="username"
              className="block text-[0.7rem] font-semibold text-white/50 uppercase tracking-widest mb-1.5"
            >
              Username
            </label>
            <input
              onChange={(e) => setInput(e.target.value)}
              required
              id="username"
              type="text"
              placeholder="e.g. wilker_dev"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-white/90 text-sm placeholder:text-white/20 outline-none transition-all duration-200 focus:border-indigo-500/70 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <button
            type="submit"
            className="mt-1 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold tracking-wide shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:opacity-90 hover:-translate-y-px active:scale-[0.98] transition-all duration-150 cursor-pointer"
          >
            Sign in →
          </button>
        </form>

      </div>
    </div>
  );
}