import { sendSuccessResponse } from "../utils/response.js";
import AuthService from "../services/Auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const signupController = asyncHandler(async (req, res) => {
  // try {
  const { name, email, password } = req.body;
  const result = await AuthService.registerUser({ name, email, password });
  sendSuccessResponse(res, 201, "Sign up successful", { result });
});
const loginController = asyncHandler(async (req, res) => {
  
    const { email, password } = req.body;
    const result = await AuthService.loginUser({ email, password });
    sendSuccessResponse(res, 200, "Logged in successfully", { result });
});

export { signupController, loginController };
