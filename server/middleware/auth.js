import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    // 🔍 DEBUG LOGS
    console.log("Cookies:", req.cookies);
    console.log("Authorization Header:", req.headers.authorization);

    let token = null;

    // Prefer cookies first
    if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
        error: true,
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized or invalid token",
      error: true,
      success: false,
    });
  }
};

export default auth;

// import jwt from "jsonwebtoken";

// const auth = async (request, response, next) => {
//   try {
//     const token =
//       request.cookies.accessToken ||
//       request?.headers?.authorization?.split(" ")[1];

//     if (!token) {
//       return response.status(401).json({
//         message: "Provide token",
//       });
//     }

//     const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

//     if (!decode) {
//       return response.status(401).json({
//         message: "unauthorized access",
//         error: true,
//         success: false,
//       });
//     }

//     request.userId = decode.id;

//     next();
//   } catch (error) {
//     return response.status(500).json({
//       message: "You have not login", ///error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };

// export default auth;

// last 
// import jwt from "jsonwebtoken";

// const auth = async (request, response, next) => {
//   try {
//     const token =
//       request.cookies.accessToken ||
//       request?.headers?.authorization?.split(" ")[1];

//     if (!token) {
//       return response.status(401).json({
//         message: "Provide token",
//       });
//     }

//     const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

//     if (!decode) {
//       return response.status(401).json({
//         message: "unauthorized access",
//         error: true,
//         success: false,
//       });
//     }

//     request.userId = decode.id;

//     next();
//   } catch (error) {
//     return response.status(500).json({
//       message: "You have not login", ///error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };

// export default auth;
