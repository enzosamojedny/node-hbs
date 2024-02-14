const compression = require("express-compression");

function customCompression(req, res, next) {
  const compressionMiddleware = compression({
    brotli: { enabled: true },
    zlib: {},
  });

  compressionMiddleware(req, res, function (err) {
    if (err) {
      console.error("Compression error:", err);
      return next(err);
    }
    next();
  });
}

module.exports = customCompression;
