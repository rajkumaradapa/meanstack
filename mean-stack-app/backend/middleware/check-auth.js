const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log('hello123');
    jwt.verify(token, "secret_this_longer");
    next();
  } catch(error) {
    res.status(401).json({message:"Auth failed"});
  }
}
