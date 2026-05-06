import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import { createClient } from "@libsql/client";

import { Server } from "socket.io";
import { createServer } from "node:http";

dotenv.config();

const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});

app.use(express.static('dist'));

const db = createClient({
  url: "libsql://mi-base-de-datos-wilker31vivas.aws-us-east-1.turso.io",
  authToken: process.env.DB_TOKEN,
});

await db.execute(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    username TEXT,
    avatar TEXT
  )  
`);

io.on("connection", async (socket) => {
  console.log("a user has connected!");

  socket.on("disconnect", () => {
    console.log("a user has disconnected!");
  });

  const MAX_MSG_LENGTH = 50;
  const isValidMessage = (msg) =>
    msg && msg.trim().length > 0 && msg.length <= MAX_MSG_LENGTH;

  socket.on("chat message", async (msg) => {
    const username = socket.handshake.auth.username ?? "anonymous";
    const avatar = socket.handshake.auth.avatar;

    let result;
    if (!isValidMessage(msg)) return socket.emit("error", "Invalid message");
    try {
      result = await db.execute({
        sql: "INSERT INTO messages (content, username, avatar) VALUES (:msg, :username, :avatar)",
        args: { msg, username, avatar },
      });
      io.emit("chat message", msg, result.lastInsertRowid.toString(), username, avatar);

    } catch (e) {
      console.error("DB Insert failed:", e);
      socket.emit("error", { msg: "The message could not be saved." });
    }
  });

  if (!socket.recovered) {
    try {
      const results = await db.execute({
        sql: "SELECT id, content, username, avatar FROM messages WHERE id > ?",
        args: [socket.handshake.auth.serverOffset ?? 0],
      });

      results.rows.forEach((row) => {
        socket.emit("chat message", row.content, row.id.toString(), row.username, row.avatar);
      });
    } catch (e) {
      console.error(e);
      return;
    }
  }
});

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/dist/index.html");
});

server.listen(port, () => {
  console.log(`Running server on port ${port}`);
});
