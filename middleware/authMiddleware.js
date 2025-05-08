import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CustomError } from "../utils/customeError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

dotenv.config();

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    throw new CustomError("Access Denied! Invalid or Missing Token.", 401);
  }

  const token = authHeader;
  // try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = decoded;
  next();
});

const dummyauthMiddlewareForAdmin = async (req, res, next) => {
  req.user = {
    _id: "67bd7626fe3c8255cc47ee78",
    name: "Abhay prajapati",
    email: "abhayparja88@gmail.com",
    role: "user",
  };
  next();
};

const dummyauthMiddlewareForUser = async (req, res, next) => {
  req.user = {
    _id: "67bc46e65f0ec29d585b4db7",
    name: "Kuldeep bairwa",
    email: "kv74@gmail.com",
    role: "user",
  };
  next();
};

export {
  authMiddleware,
  dummyauthMiddlewareForAdmin,
  dummyauthMiddlewareForUser,
};
