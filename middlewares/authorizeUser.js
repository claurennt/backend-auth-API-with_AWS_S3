const jwt = require("jsonwebtoken");
const atob = require("atob");

const { JWT_SECRET_KEY, JWT_ADMIN_KEY } = process.env;

//authorize user after login
const authorizeUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send("Access denied. No token provided.");

  const [, authToken] = authHeader.split(" ");

  const payload = authToken.split(".")[1];

  //decode base64 encoded payload to string first and then parse it to JSON
  const decodedUserData = JSON.parse(atob(payload));

  //get role for role-based jwt verification
  const role = decodedUserData.role;

  //verify the token against the key depending on the role decoded from the token
  try {
    const userContext = jwt.verify(
      authToken,
      role === "admin" ? JWT_ADMIN_KEY : JWT_SECRET_KEY
    );

    return res.status(200).send(userContext);
  } catch (e) {
    next(e);
  }
};
module.exports = authorizeUser;
