const createSessionMiddleware = require("express-session");
const MongoStore = require("connect-mongo");
const { MONGODB_CNX_STR } = require("../../config");
const passport = require("passport");
const { Strategy } = require("passport-local");
const Users = require("../../dao/models/Users");
const UsersManager = require("../../dao/UsersManager");
const bcrypt = require("bcrypt");
const usersManagerMongoDB = new UsersManager();

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
passport.use(
  "register",
  new Strategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    async (req, _u, _p, done) => {
      try {
        const userData = await usersManagerMongoDB.registerUser(req.body);
        done(null, userData);
      } catch (error) {
        return done(null, false, { message: error.message });
      }
    }
  )
);
async function authenticateUser(username, password) {
  const userFound = await Users.findOne({ email: username }).lean();
  if (!userFound) {
    throw new Error("Login failed. User not found");
  }
  const passwordMatch = await bcrypt.compare(password, userFound.password);

  //!
  const userData = {
    email: userFound.email,
    first_name: userFound.first_name,
    last_name: userFound.last_name,
    gender: userFound.gender,
  };
  if (!userData) {
    throw new Error("User not found for email: " + username);
  }
  if (!passwordMatch) {
    throw new Error("Incorrect password for user: " + username);
  }
  return userData;
}
passport.use(
  "login",
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      console.log("Attempting login for email:", email);
      try {
        const userData = await authenticateUser(email, password);
        console.log("Authentication result:", userData);
        if (!userData) {
          // No user found or invalid credentials
          return done(null, false, { message: "Invalid email or password" });
        }

        // Authentication successful
        return done(null, userData);
      } catch (error) {
        // Handle other errors during authentication
        console.error("Authentication error:", error);
        return done(null, false, { message: "Internal Server Error" });
      }
    }
  )
);

module.exports = { sessionMiddleware, auth };
