import jwt from "jsonwebtoken";

// auth middleware.
// this wil be placed for every protected api endpoints/routes
// which only logged in users can access
export function authMiddleware(req, res, next) {
  console.log("*****middleware reached");

  console.log("**** req.cookies", req.cookies);

  //cookieParser() middleware will put the token send by the browser in req.cookies.
  // here "mytoken" is the name of the cookie we set while login.
  const token = req.cookies.mytoken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // verify if the token is valid.
    // it will also return the stored payload.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // so decoded variable here will have that payload we put in the token. which is the user id.

    // storing the user id in req object. so that we can access it in the next middleware/controller via req.myUserId.
    // we can use any name.
    req.userId = decoded.userId;

    // calling next() so the request can move to the next middleware/controller
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized.Please Login" });
  }
}
