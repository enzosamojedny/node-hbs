const createSessionMiddleware = require("express-session");
const MongoStore = require("connect-mongo");
const { MONGODB_CNX_STR } = require("../../config");
const passport = require("passport");
passport.serializeUser((user, next) => {
  next(null, user);
});
passport.deserializeUser((user, next) => {
  next(null, user);
});
const passportInitialize = passport.initialize();
const PassportSession = passport.session();

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

function auth(req, res, next) {
  passportInitialize(req, res, () => {
    PassportSession(req, res, next);
  });
}

module.exports = { sessionMiddleware, auth };
