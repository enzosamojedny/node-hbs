const messagesRouter = require("./src/routes/MessageRoutes.js");
const productRouter = require("./src/routes/ProductRoutes");
const cartRouter = require("./src/routes/CartRoutes");
const indexRouter = require("./src/routes/defaultRoute.js");
const cookiesRouter = require("./src/routes/SessionRoutes.js");
const usersRouter = require("./src/routes/UsersRoutes.js");
const { createServer } = require("node:http");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const { Server: IOServer } = require("socket.io");
const express = require("express");
const { MONGODB_CNX_STR } = require("./config.js");
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const MessagesManager = require("./dao/MessagesManager");
const Products = require("./dao/models/Products.js");
const messagesManager = new MessagesManager();
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");

//! DB CONNECTION
const enviroment = async () => {
  await mongoose.connect(MONGODB_CNX_STR);
  await Products.paginate({}, { limit: 10, page: 1 });
};
enviroment();

console.log("db connected to: ", MONGODB_CNX_STR);
const server = express();
const port = 3001;
//?COOKIES

function showCookies(req, res, next) {
  console.dir(req.session);
  next();
}
/*server.use(showCookies);
server.use(session, {
  store: MongoStore.create({
    mongoUrl: MONGODB_CNX_STR,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    ttl: 3600,
  }),
  secret: "secretword",
  //* resave mantiene la coneccion activa aunque se cierre
  resave: true,
  //*saveUnitialized guarda cualquier sesion aunque el objeto este vacio
  saveUnitialized: true,
});*/

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

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(indexRouter, messagesRouter, productRouter, cartRouter, usersRouter);

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

module.exports = { httpServer };
