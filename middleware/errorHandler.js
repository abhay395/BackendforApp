import { CustomError } from "../utils/customeError.js";

function errorHandler(err, req, res, next) {
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]; // Get the field name (e.g., email)
    return res.status(400).json({
      success: false,
      message: `This ${
        field.charAt(0).toUpperCase() + field.slice(1)
      } already exists!`, // Field name dynamic
    });
  }
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  if (err?.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token has expired. Please log in again.",
    });
  }
    console.log(err)
  return res.status(500).json({
    success: false,
    message: "SomeThing went wrong!",
  });
}

export { errorHandler };
