import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./useAuth";

let socket = null;

export function useChat() {
  const { getUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState({
    username: "",
    avatar: "",
  });

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    
    if (!userFromStorage) return;
    
      const initSocket = async () => {
        const userWithAvatar = getUser();
        setUser(userWithAvatar);

        socket = io({
          auth: {
            username: userWithAvatar.username,
            avatar: userWithAvatar.avatar,
            serverOffset: 0,
          },
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
    
  }, [getUser, user]);

  const sendMessage = useCallback((message) => {
    if (socket && message.trim()) {
      socket.emit("chat message", message);
    }
  }, []);

  return { messages, user, isConnected, sendMessage };
}
