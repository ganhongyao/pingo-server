const express = require("express");
const socketIo = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 4001;

const index = require("./routes/index");

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(index);

const users = new Map();

io.on("connection", (socket) => {
  console.log("New client connected");
  users.set(socket.id, {});

  socket.on("set name", (name) => {
    console.log("Set name");
    users.set(socket.id, { ...users.get(socket.id), name: name });
    socket.broadcast.emit("friend connection", name);
  });

  socket.on("location update", (location) => {
    console.log("Location update");
    console.log(location);
    users.set(socket.id, { ...users.get(socket.id), location: location });
    socket.broadcast.emit("friend location update", location);
  });

  socket.on("query friend locations", () => {
    const friendLocations = Array.from(users.keys())
      .filter((socketId) => users.get(socketId).name)
      .map((socketId) => ({
        socketId: socketId,
        name: users.get(socketId).name,
        location: users.get(socketId).location,
      }));
    socket.emit("friend locations", friendLocations);
    console.log("Query friend locations");
    console.log(friendLocations);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    socket.broadcast.emit("friend disconnection", "Goodbye from server");
    users.delete(socket.id);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
