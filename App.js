const router = require("./src/routes/routes");
const { createServer } = require("node:http");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const { Server: IOServer } = require("socket.io");
const express = require("express");
const { MONGODB_CNX_STR } = require("./config.js");
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect(MONGODB_CNX_STR);
console.log("db connected to: ", MONGODB_CNX_STR);
const server = express();
const port = 3001;

server.engine("hbs", engine({ extname: ".hbs" }));
server.set("views", "./views");
server.set("view engine", "hbs");
server.use(
  "/static",
  express.static("./static", {
    setHeaders: (res) => res.setHeader("Content-Type", "text/javascript"),
  })
);

server.use(bodyParser.json());
server.use(router);

// EXPRESS SERVER
const httpServer = createServer(server);
server.set("engine", engine());
server.use(morgan("dev"));
server.use(express.json());

const serverListener = httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
const ioServer = new IOServer(serverListener);
server.use((req, res, next) => {
  req["io"] = ioServer;
  next();
});
const messages = [];
//socket emite un mensaje del servidor al cliente con el json de productos
server.post("/api/realtimeproducts", (req, res) => {
  messages.push(req.body.message);
  req["io"].sockets.emit("message", messages);
  res.status(200).send();
});
server.post("/messages", (req, res) => {
  messages.push(req.body.message);
  req["io"].sockets.emit("message", messages);
  res.status(200).send();
});
//socket escucha y emite un mensaje al cliente con el array de mensajes
ioServer.on("connection", (socket) => {
  console.log("new connection: ", socket.id);
  socket.emit("message", messages);

  //socket recibe un mensaje del cliente con el valor del input
  socket.on("message", (data) => {
    messages.push(data);

    //socket emite un mensaje al cliente con
    ioServer.sockets.emit("message", messages);
  });
});
module.exports = { httpServer };
