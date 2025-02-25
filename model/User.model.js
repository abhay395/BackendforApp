import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Joi from "joi";
import { CustomError } from "../utils/customeError.js";

// Mongoose Schema for User
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  createdAt: { type: Date, default: Date.now },
  role:{type:String,default:'user',enum:["user","admin"]}
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
// Joi validation schema for user input
const signupValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    'string.empty': 'Name cannot be empty',
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid email",
    'string.empty': 'email cannot be empty',
  }),
  password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
  .required()
  .messages({
    'string.pattern.base': 'Password must be at least 8 characters long and include upper, lower, number, and special.',
    'string.empty': 'Password cannot be empty',
    'any.required': 'Password is required'
  }),
  createdAt: Joi.date().default(Date.now),
});
const loginValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid email",
  }),
  password: Joi.string().min(8).required().messages({
    "any.required": "Password is required",
    "string.min": "Password must be at least 8 characters long",
  }),
});

// Middleware to validate user input
const validateSignup = (req, res, next) => {
  const { error } = signupValidationSchema.validate(req.body);

  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }
  next();
};
const validateLogin = (req, res, next) => {
  const { error } = loginValidationSchema.validate(req.body);

  if (error) {
    return next(new CustomError(error.details[0].message,400))
  }
  next();
};

// Mongoose User model
const User = mongoose.model("User", userSchema);

export { User, validateSignup, validateLogin };
