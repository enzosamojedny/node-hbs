const createSessionMiddleware = require("express-session");
const MongoStore = require("connect-mongo");
const { MONGODB_CNX_STR } = require("../../config");
const sessionMiddleware = createSessionMiddleware({
  store: MongoStore.create({
    mongoUrl: MONGODB_CNX_STR,
    mongoOptions: {
      useUnifiedTopology: true,
    },
    ttl: 3600,
  }),
  secret: "secretword",
  //* resave mantiene la coneccion activa aunque se cierre
  resave: true,
  //*saveUnitialized guarda cualquier sesion aunque el objeto este vacio
  saveUninitialized: true,
});

function onlyLogged(req, res, next) {
  if (req.session["user"]) {
    return res
      .status(400)
      .json({ status: "error", message: "You need to login first" });
  }
  next();
}

module.exports = { sessionMiddleware, onlyLogged };
