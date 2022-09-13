import jwt from "jsonwebtoken";

const { JWT_SECRET_KEY, JWT_ADMIN_KEY } = process.env;

const authorizeUser = (req, res, next) => {
  try {
    const { originalUrl } = req;
    console.log(originalUrl);
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return res.status(401).send("Access denied. No token provided.");

    const [, authToken] = authHeader.split(" ");

    const [, payload, ,] = authToken.split(".");

    //decode base64 encoded payload
    const decodedUserData = JSON.parse(Buffer.from(payload, "base64"));

    //get role for role-based jwt verification
    const { role } = decodedUserData;

    //block requests on path /users if role is not admin
    if (originalUrl === "/users" && role === "user")
      return res.status(403).send("Missing admin rights");

    //verify the token against the key depending on the role decoded from the token
    const userContext = jwt.verify(
      authToken,
      role === "admin" ? JWT_ADMIN_KEY : JWT_SECRET_KEY
    );

    req.currentUser = userContext;
    next();
  } catch (e) {
    next(e);
  }
};

export default authorizeUser;
