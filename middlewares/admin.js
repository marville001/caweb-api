module.exports = function (req, res, next) {
  if (req.user.role === "admin") return next();
  res.status(403).send({ success: false, message: "Access denied. " });
};
