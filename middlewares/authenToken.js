const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  const token = authorizationHeader.split(' ')[1];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  else {
    jwt.verify(token, process.env.ACCESS_TEXT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.payload = payload
      console.log(payload)
    });
    next();
  }
}