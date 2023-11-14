const express = require("express");
const router = require("./src/routes/routes");
const { createServer } = require("node:http");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const { Server: IOServer } = require("socket.io");
const server = express();
const port = 3001;

// HANDLEBARS
server.engine("hbs", engine({ extname: ".hbs" }));
server.set("views", "./views");
server.set("view engine", "hbs");
server.use(
  "/static",
  express.static("./static", {
    setHeaders: (res) => res.setHeader("Content-Type", "text/javascript"),
  })
);

// EXPRESS SERVER
const httpServer = createServer(server);
server.set("engine", engine());
server.use(morgan("dev"));
server.use(express.json());
server.use("/", router);
const serverListener = httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const ioServer = new IOServer(serverListener);
const messages = [];
ioServer.on("connection", (socket) => {
  console.log("new connection: ", socket.id);
  socket.emit("message", messages);

  socket.on("message", (data) => {
    messages.push(data);
    ioServer.sockets.emit("messages", messages);
  });
});
module.exports = { httpServer };
