import { useState, useCallback, useEffect } from "react";

export function useAuth() {
  const [user, setUserState] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  const setUser = useCallback((name) => {
    const newUser = {
      username: name,
      avatar: `https://robohash.org/${name}`,
    };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUserState(newUser);
  }, []);

  const clearUser = useCallback(() => {
    localStorage.removeItem("user");
    setUserState(null);
  }, []);

  return { user, setUser, clearUser };
}
