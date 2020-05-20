function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send("noo");
}

module.exports = ensureAuthenticated;


