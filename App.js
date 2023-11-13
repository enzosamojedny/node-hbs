const express = require("express");
const router = require("./src/routes/routes");
const http = require("http");
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
const httpServer = http.createServer(server);
server.set("engine", engine());
server.use(morgan("dev"));
server.use(express.json());
server.use("/", router);

const serverListener = httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const ioServer = new IOServer(serverListener);
ioServer.on("connection", (socket) => {
  console.log("new connection: ", socket.id);
  socket.emit("message", "test message");
});

module.exports = httpServer;
