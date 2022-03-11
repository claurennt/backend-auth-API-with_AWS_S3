const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY, JWT_ADMIN_KEY } = process.env;
const atob = require("atob");

const authorizeUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send("Access denied. No token provided.");

  const [_, authToken] = authHeader.split(" ");
  // const regex=/^role"role":
  //   console.log(Buffer.from(authToken, "base64").toString());
  try {
    const payload = jwt.verify(authToken, JWT_ADMIN_KEY);

    res.send(payload);
  } catch (e) {
    next(e);
  }
};
module.exports = authorizeUser;
