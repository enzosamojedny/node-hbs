// export const MONGODB_CNX_STR =
//   "mongodb+srv://enzosamojedny:PdnfivdQNx5ML6Q0@cluster0.oenvq5y.mongodb.net/";
const MONGODB_CNX_STR =
  "mongodb+srv://enzosamojedny:PdnfivdQNx5ML6Q0@cluster0.oenvq5y.mongodb.net/Coderhouse";

const githubAppId = 730060;
const githubClientId = "Iv1.3c36142a1cb4062a";
const githubSecret = "d141f4fef4bd27741766cb597274afcfe8107481";
const githubCallback = "http://localhost:3001/api/github/callback";

const googleClientId =
  "1062413553399-kgtd2vq0jsdcvbsn801oko70v9ehbss2.apps.googleusercontent.com";
const googleSecret = "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";
const googleCallback = "http://localhost:3001/oauth2/redirect/google";

const COOKIE_SECRET = "cookie_secret_word";
const JWT_PRIVATE_KEY = "jwt_private_key_word";

module.exports = {
  MONGODB_CNX_STR,
  githubAppId,
  githubCallback,
  githubClientId,
  githubSecret,
  googleClientId,
  googleSecret,
  googleCallback,
  COOKIE_SECRET,
  JWT_PRIVATE_KEY,
};
