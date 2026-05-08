import { useState, useEffect, useCallback, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./useAuth";

export function useChat(user) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    let socket;

    const initSocket = async () => {
      socket = io({
        auth: {
          username: user.username,
          avatar: user.avatar,
          serverOffset: 0,
        },
      });

      socketRef.current = socket;

      socket.on("connect", () => setIsConnected(true));
      socket.on("disconnect", () => setIsConnected(false));

      socket.on("chat message", (msg, serverOffset, username, avatar) => {
        setMessages((prev) => [...prev, { msg, username, avatar }]);
        socket.auth.serverOffset = serverOffset;
      });

      socket.on("error", (msg) => setError(msg));
    };

    initSocket();

    return () => {
      socket?.disconnect();
    };
  }, [user]);

  const sendMessage = useCallback((message) => {
    if (socketRef.current && message.trim()) {
      socketRef.current.emit("chat message", message);
    }
  }, []);

  return { messages, error, isConnected, sendMessage };
}
