const { Server } = require("socket.io");

const usersOnline = new Set();

const io = new Server(8080, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
  },
});

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

  socket.on("chat", ({ roomId, username }) => {
    socket.join(roomId);

    io.to(roomId).emit("isOnline", username);
    console.log(`Пользователь ${username} присоединился к комнате ${roomId}`);
  });

  socket.on("disconnecting", () => {
    usersOnline.delete(myUserName);
    socket.broadcast.emit("users_online", [...usersOnline.values()]);
  });
});
