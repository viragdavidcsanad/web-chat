const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
app.use(cors());
const httpServer = http.createServer(app);
const port = process.env.PORT || 5000;
httpServer.listen(port, () => {
  console.log(`httpServer is listening on port ${port}`);
});

app.get("/", (_req, res) => {
  res.send({ status: 200 });
});

const { Server } = require("socket.io");
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} has connected`);
});
