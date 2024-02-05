require("dotenv").config();
const { sessionMiddleware, auth } = require("./src/middlewares/Passport.js");
const { createServer } = require("node:http");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const { Server: IOServer } = require("socket.io");
const express = require("express");
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const MessagesManager = require("./src/daos/managers/MessagesManager");
const Products = require("./src/daos/models/Products.js");
const messagesManager = new MessagesManager();
const path = require("path");
const Chatbot = require("./src/bot/chatbot.js");
const mainRouter = require("./src/routes/mainRouter.js");
const bot = new Chatbot({ utf8: true, forceCase: true });
bot.unicodePunctuation = new RegExp(/[.,!?;:]/g);

const enviroment = async () => {
  await mongoose.connect(process.env.MONGODB_CNX_STR);
  await Products.paginate({}, { limit: 10, page: 1 });
};
enviroment();

console.log("db connected to: ", process.env.MONGODB_CNX_STR);
const server = express();
const port = 3001;

server.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "/views/layouts"),
    partialsDir: path.join(__dirname, "/views/partials"),
  })
);
server.set("views", path.join(__dirname, "/views/partials"));
server.set("view engine", "hbs");

server.use("/static", express.static(path.join(__dirname, "static")));
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(sessionMiddleware);
server.use(auth);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(mainRouter);

// EXPRESS SERVER
const httpServer = createServer(server);
server.set("engine", engine());
server.use(morgan("dev"));

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
    let messages = await messagesManager.getMessages();
    console.log("new connection: ", socket.id);

    await bot.initialize();

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

        let reply;
        try {
          reply = await bot.getResponse(data.message);
          console.log("Bot's reply:", reply);
        } catch (botError) {
          console.error("Error in bot reply:", botError.message);
        }

        socket.emit("bot reply", reply);

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

module.exports = { httpServer };
