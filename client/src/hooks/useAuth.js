export function useAuth() {
  const getUser = () => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  };

  const setUser = async (name) => {
    const userWithAvatar = {
      username: name,
      avatar: `https://robohash.org/${name}`,
    };
    localStorage.setItem("user", JSON.stringify(userWithAvatar));
  };

  return { getUser, setUser };
}
