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

const locations = new Map();

io.on("connection", (socket) => {
  console.log("New client connected");
  locations.set(socket.id, {});

  socket.broadcast.emit("friend connection", "Hello from server");

  socket.on("location update", (location) => {
    console.log("Location update");
    locations.set(socket.id, location);
    socket.broadcast.emit("friend location update", location);
  });

  socket.on("query friend locations", () => {
    socket.emit("friend locations", Object.fromEntries(locations));
    console.log("Query friend locations");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    locations.delete(socket.id);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));