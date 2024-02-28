const appError = require("../utils/appError");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isLogin = (req, res, next) => {
  //Get token from header
  const token = getTokenFromHeader(req);
  //Verify the token
  const decodedUser = verifyToken(token);

  //Save the user into req object
  req.userAuth = decodedUser.id;

  if (!decodedUser) {
    return next(appError("Invalid/Expired token, Please login again", 500));
  } else {
    next();
  }
};

module.exports = isLogin;
