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

const getUser = (socketId) => ({
  socketId: socketId,
  name: users.get(socketId).name,
  location: users.get(socketId).location,
});

const events = require("./events");

io.on("connection", (socket) => {
  console.log("New client connected");
  users.set(socket.id, {});

  socket.on(events.EVENT_UPDATE_NAME, (name) => {
    console.log("Update name");
    users.set(socket.id, { ...users.get(socket.id), name: name });
    socket.broadcast.emit(events.EVENT_FRIEND_CONNECTION, name);
  });

  socket.on(events.EVENT_UPDATE_LOCATION, (location) => {
    console.log("Location update");
    console.log(location);
    users.set(socket.id, { ...users.get(socket.id), location: location });
    socket.broadcast.emit(events.EVENT_FRIEND_LOCATION_UPDATE, location);
  });

  socket.on(events.EVENT_QUERY_FRIEND_LOCATIONS, () => {
    const friendLocations = Array.from(users.keys())
      .filter((socketId) => users.get(socketId).name)
      .map((socketId) => ({
        socketId: socketId,
        name: users.get(socketId).name,
        location: users.get(socketId).location,
      }));
    socket.emit(events.EVENT_FRIEND_LOCATIONS, friendLocations);
    console.log("Query friend locations");
    console.log(friendLocations);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    socket.broadcast.emit(
      events.EVENT_FRIEND_DISCONNECTION,
      getUser(socket.id)
    );
    console.log(getUser(socket.id));
    users.delete(socket.id);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
