const createSessionMiddleware = require("express-session");
const MongoStore = require("connect-mongo");
const { MONGODB_CNX_STR, JWT_PRIVATE_KEY } = require("../../config");
const passport = require("passport");
const { Strategy } = require("passport-local");
const Users = require("../../dao/models/Users");
const UsersManager = require("../../dao/UsersManager");
const bcrypt = require("bcrypt");
const usersManagerMongoDB = new UsersManager();
const { Strategy: GithubStrategy } = require("passport-github2");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
let JwtStrategy = require("passport-jwt").Strategy;
const { encrypt } = require("./auth");

const {
  githubAppId,
  githubCallback,
  githubClientId,
  githubSecret,
  googleClientId,
  googleSecret,
  googleCallback,
} = require("../../config");

//! keep this as is
passport.serializeUser((user, next) => {
  next(null, user);
});
passport.deserializeUser((user, next) => {
  next(null, user);
});

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
  //! changed
  passport.initialize()(req, res, () => {
    passport.session()(req, res, () => {
      next();
    });
  });
}

//! PASSPORT JWT

const COOKIE_OPTIONS = {
  signed: true,
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
};
async function appendJwtAsCookie(req, res, next) {
  try {
    const token = await encrypt(req.user);
    console.log(token);
    res.cookie("authorization", token, COOKIE_OPTIONS);
    next();
  } catch (error) {
    next(error);
  }
}

async function removeJwtFromCookies(req, res, next) {
  res.clearCookie("authorization", COOKIE_OPTIONS);
  next();
}

passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: (req) => {
        let token = null;
        if (req?.signedCookies) {
          token = req.signedCookies["authorization"];
          console.log("signed cookies", token);
        }
        return token;
      },
      secretOrKey: "pepito",
    },
    (payload, done) => {
      done(null, payload);
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleSecret,
      callbackURL: googleCallback,
      scope: ["profile", "email"],
    },
    async function verify(accessToken, refreshToken, profile, done) {
      try {
        console.log("Received profile from Google:", profile);

        if (!profile.emails || profile.emails.length === 0) {
          throw new Error("Google profile does not contain email information.");
        }

        const email = profile.emails[0].value;
        const user = await Users.findOne({ email });

        if (user) {
          return done(null, { ...user.publicInfo() });
        }

        const registered = await Users.create({
          email,
          password: "(undefined)",
          first_name: profile.name.givenName || "(undefined)",
          last_name: profile.name.familyName || "(undefined)",
          gender: (profile._json && profile._json.gender) || "(undefined)",
        });

        done(null, { ...registered.publicInfo() });
      } catch (error) {
        console.error("Error in Google authentication strategy:", error);
        done(error);
      }
    }
  )
);

passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: githubClientId,
      clientSecret: githubSecret,
      callbackURL: githubCallback,
    },
    async function verify(accessToken, refreshToken, profile, done) {
      console.log(profile);
      const user = await Users.findOne({
        email: profile.username,
      });
      if (user) {
        return done(null, {
          ...user.publicInfo(),
          // admin: false
        });
      }
      try {
        const registered = await Users.create({
          email: profile.username,
          password: "(undefined)",
          first_name: profile.displayName || "(undefined)",
          last_name: profile.name
            ? profile.name.familyName || "(undefined)"
            : "(undefined)",
          gender: profile.gender || "(undefined)",
        });
        done(null, {
          ...registered.publicInfo(),
          // admin: false
        });
      } catch (error) {
        done(error);
      }
    }
  )
);

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
        console.log("REGISTER strategy", userData);
        done(null, userData);
      } catch (error) {
        return done(null, false, { message: error.message });
      }
    }
  )
);
//! aca iria JWT, habria que borrar esto
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
          return done(null, false, { message: "Invalid email or password" });
        }
        return done(null, userData);
      } catch (error) {
        console.error("Authentication error:", error);
        return done(null, false, { message: "Internal Server Error" });
      }
    }
  )
);

module.exports = {
  sessionMiddleware,
  auth,
  appendJwtAsCookie,
  removeJwtFromCookies,
};
