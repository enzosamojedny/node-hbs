function onlyLoggedApi(req, res, next) {
  if (!req.isAuthenticated()) {
    return res
      .status(400)
      .json({ status: "error", message: "You need to log in to view the API!" });
  }
  next();
}
function onlyLoggedClient(req, res, next) {
  if (!req.isAuthenticated()) {
    return res
      .status(400)
      .json({ status: "error", message: "You need to log in first!" });
  }
  next();
}
module.exports = { onlyLoggedClient, onlyLoggedApi };
