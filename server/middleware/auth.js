// import jwt from "jsonwebtoken";
// const auth = async (req, res, next) => {
//   try {
//     const token = req.cookies.accessToken;

//     if (!token) {
//       return res.status(401).json({ message: "Please login", success: false });
//     }

//     const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
//     req.userId = decoded.id;

//     next();
//   } catch (err) {
//     res
//       .status(401)
//       .json({ message: "Unauthorized or invalid token", success: false });
//   }
// };
// export default auth;

// import jwt from "jsonwebtoken";

// const auth = async (request, response, next) => {
//   try {
//     let token = null;

//     // Check for token in cookie
//     if (request.cookies && request.cookies.accessToken) {
//       token = request.cookies.accessToken;
//     }

//     // Else check in headers
//     else if (
//       request.headers.authorization &&
//       request.headers.authorization.startsWith("Bearer ")
//     ) {
//       token = request.headers.authorization.split(" ")[1];
//     }

//     // No token found
//     if (!token) {
//       return response.status(401).json({
//         message: "Please Login",
//         error: true,
//         success: false,
//       });
//     }

//     const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

//     request.userId = decoded.id;

//     next();
//   } catch (error) {
//     return response.status(401).json({
//       message: "Unauthorized or invalid token",
//       error: true,
//       success: false,
//     });
//   }
// };

// export default auth;

import jwt from "jsonwebtoken";

const auth = async (request, response, next) => {
  try {
    const token =
      request.cookies.accessToken ||
      request?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return response.status(401).json({
        message: "Provide token",
      });
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    if (!decode) {
      return response.status(401).json({
        message: "unauthorized access",
        error: true,
        success: false,
      });
    }

    request.userId = decode.id;

    next();
  } catch (error) {
    return response.status(500).json({
      message: "You have not login", ///error.message || error,
      error: true,
      success: false,
    });
  }
};

export default auth;
