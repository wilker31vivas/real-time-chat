import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";

let socket = null;

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const getUserName = useCallback(async () => {
    const stored = localStorage.getItem("username");
    if (stored) return stored;

    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const randomName = data.results[0].name.first;
    localStorage.setItem("username", randomName);
    return randomName;
  }, []);

  useEffect(() => {
    const initSocket = async () => {
      const name = await getUserName();
      setUsername(name);

      socket = io({
        auth: { username: name, serverOffset: 0 },
      });

      socket.on("connect", () => {
        setIsConnected(true);
        console.log("Connected");
      });

      socket.on("chat message", (msg, serverOffset, user) => {
        setMessages((prev) => [...prev, { msg, user }]);
        socket.auth.serverOffset = serverOffset;
      });

      socket.on("error", (error) => {
        console.error("Socket error:", error);
      });

      return () => {
        socket?.disconnect();
      };
    };

    initSocket();
  }, [getUserName]);

  const sendMessage = useCallback((message) => {
    if (socket && message.trim()) {
      socket.emit("chat message", message);
    }
  }, []);

  return { messages, username, isConnected, sendMessage };
}
