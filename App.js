const router = require("./src/routes/routes");
const { createServer } = require("node:http");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const { Server: IOServer } = require("socket.io");
const express = require("express");
const { MONGODB_CNX_STR } = require("./config.js");
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const MessagesManager = require("./dao/MessagesManager");
const messagesManager = new MessagesManager();
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

ioServer.on("connection", async (socket) => {
  try {
    // Gets the initial set of messages
    let messages = await messagesManager.getMessages();
    console.log("new connection: ", socket.id);
    socket.emit("messages", messages);
    console.log("Messages sent to client:", messages);

    // CLIENT EMITS MESSAGE
    socket.on("message", async (data) => {
      try {
        console.log("Message received in App.js:", data);
        const messageCreated = await messagesManager.addMessage({
          user: data.user,
          message: data.message,
        });
        console.log("Message created in DB:", messageCreated);
        // SERVER EMITS MESSAGES ARRAY TO ALL CONNECTED CLIENTS
        ioServer.emit("messages", [messageCreated]);
      } catch (error) {
        console.error("Error adding message:", error.message);
      }
    });

    // DISCONNECT EVENT
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
});

// Move this outside of the connection event
server.get("/messages", async (req, res) => {
  try {
    return res.render("chat.hbs", { title: "Handlebars chat" });
  } catch (error) {
    res.status(400).send({ status: "Error", message: error.message });
  }
});

module.exports = { httpServer };
