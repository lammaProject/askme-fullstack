const { createServer } = require("node:http");
const { Server } = require("socket.io");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const usersOnline = new Set();

  const httpServer = createServer(handler, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PATCH"],
    },
  });

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    let myUserName;

    socket.on("users_online", (username) => {
      if (username === "update") {
        socket.emit("users_online", [...usersOnline.values()]);
        return;
      }

      myUserName = username;
      usersOnline.add(username);
      socket.broadcast.emit("users_online", [...usersOnline.values()]);
    });

    socket.on("chat", ({ roomId, username, message }) => {
      socket.join(roomId);
      console.log(message, "message");
      io.to(roomId).emit("isOnline", username);
      io.to(roomId).emit("message", message);
    });

    socket.on("disconnecting", () => {
      usersOnline.delete(myUserName);
      socket.broadcast.emit("users_online", [...usersOnline.values()]);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
