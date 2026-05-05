import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const getUserName = async () => {
  const username = localStorage.getItem("username");
  if (username) {
    return username;
  }

  const res = fetch("https://randomuser.me/api/")
    .then((response) => response.json())
    .then((data) => {
      const randomUserName = data.results[0].name.first;
      localStorage.setItem("username", randomUserName);
      console.log(data.results[0].name.first);
      return randomUserName;
    });
};

getUserName();

const socket = io({
  auth: {
    username: await getUserName(),
    serverOffset: 0,
  },
});

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

socket.on("chat message", (msg, serverOffset, username) => {
  const item = `<li>
          <p>${msg}</p>
          <small>${username}</small>
          </li>`;
  messages.insertAdjacentHTML("beforeend", item);
  socket.auth.serverOffset = serverOffset;
  const isNearBottom = messages.scrollHeight - messages.scrollTop < 100;
  if (isNearBottom) {
    messages.scrollTop = messages.scrollHeight;
  }
});

socket.on("error", (msg) => {
  alert(msg);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});
