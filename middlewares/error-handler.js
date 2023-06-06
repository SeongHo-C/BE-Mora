module.exports = (err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
};
