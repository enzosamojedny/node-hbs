const express = require("express");
const router = require("./src/routes/routes");
const { createServer } = require("node:http");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const { Server: IOServer } = require("socket.io");
const server = express();
const port = 3001;
const fs = require("fs").promises;
// HANDLEBARS
const handlebars = engine({
  extname: ".hbs",
  helpers: {
    debug: function (optionalValue) {
      console.log("Current Context:", this);
      if (optionalValue) {
        console.log("Value:", optionalValue);
      }
    },
  },
});
server.engine("hbs", handlebars);
server.set("views", "./views");
server.set("view engine", "hbs");
server.use(
  "/static",
  express.static("./static", {
    setHeaders: (res) => res.setHeader("Content-Type", "text/javascript"),
  })
);

//FS PROMISES
let products = [];
(async () => {
  try {
    const data = await fs.readFile("./src/Logs/Logs.json", "utf8");
    products = JSON.parse(data);
    //console.log("Products loaded successfully:", products);
  } catch (error) {
    console.error("Error reading Logs.json:", error.message);
    products = [];
  }
})();
server.use((req, res, next) => {
  req.products = products;
  next();
});

server.use("/realtimeproducts", router);
server.use("/", router);

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
server.post("/api/messages", (req, res) => {
  messages.push(req.body.message);
  req["io"].sockets.emit("messages", messages);
  res.status(200).send();
});

ioServer.on("connection", (socket) => {
  console.log("new connection: ", socket.id);
  socket.emit("message", messages);

  socket.on("message", (data) => {
    messages.push(data);
    ioServer.sockets.emit("messages", messages);
  });
});
module.exports = { httpServer };
