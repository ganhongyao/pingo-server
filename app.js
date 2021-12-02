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

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.broadcast.emit("friend connection", "Hello from server");
  socket.on("location update", (location) => {
    console.log("location update");
    console.log(socket);
    console.log(location);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));