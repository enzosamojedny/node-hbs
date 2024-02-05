const createSessionMiddleware = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const passport = require("passport");
const { Strategy } = require("passport-local");
const Users = require("../../src/dao/models/Users");
const UsersManager = require("../../src/dao/managers/UsersManager");
const bcrypt = require("bcrypt");
const usersManagerMongoDB = new UsersManager();
const { Strategy: GithubStrategy } = require("passport-github2");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
let JwtStrategy = require("passport-jwt").Strategy;
const { encrypt, decrypt } = require("./authentication");

//! keep this as is
passport.serializeUser((user, next) => {
  next(null, user);
});
passport.deserializeUser((user, next) => {
  next(null, user);
});

const sessionMiddleware = createSessionMiddleware({
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_CNX_STR,
    mongoOptions: {
      useUnifiedTopology: true,
    },
    ttl: 3600,
  }),
  secret: process.env.JWT_KEY, //! OR REPLACE TO "pepito"
  //* resave mantiene la coneccion activa aunque se cierre
  resave: true,
  //*saveUnitialized guarda cualquier sesion aunque el objeto este vacio
  saveUninitialized: true,
});

function auth(req, res, next) {
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
    console.log("token appended in function", token);

    res.cookie("authorization", token, COOKIE_OPTIONS);
    next();
  } catch (error) {
    next(error);
  }
}
async function decryptUserFromToken(req, res, next) {
  try {
    const token = req.user;
    const userId = await decrypt(token);

    if (!token) {
      return res.status(400).json({ message: "Unauthorized" });
    }

    req.userId = userId;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
}

async function removeJwtFromCookies(req, res, next) {
  res.clearCookie("authorization", COOKIE_OPTIONS);
  res.redirect("/login"); //not redirecting
}

//* current session
passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: (req) => {
        let token = null;
        if (req?.signedCookies) {
          token = req.signedCookies["authorization"];
          //console.log("signed cookies", token);
        }
        return token;
      },
      secretOrKey: process.env.JWT_KEY,
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
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
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
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK,
    },
    async function verify(accessToken, refreshToken, profile, done) {
      console.log(profile);
      const user = await Users.findOne({
        email: profile.username,
      });
      if (user) {
        return done(null, {
          ...user.publicInfo(),
          // role:'user'
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
          // role:'user'
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
        console.log("REGISTER", req.body);
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
    phone: userFound.phone,
    address: userFound.address,
    pfp: userFound.pfp,
    cart: userFound.cart,
    role: userFound.role,
  };
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
  decryptUserFromToken,
};
