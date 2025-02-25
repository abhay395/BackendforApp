import { User } from "../model/User.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/emailUtils.js";
import { CustomError } from "../utils/customeError.js";
dotenv.config();

const createToken = (user) => {
  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET_KEY, // Fallback secret key,
    { expiresIn: "1h" }
  );
  return token;
};
class AuthService {
  async registerUser({ name, email, password }) {
    const user = await User.create({ name, email, password });
    const token = createToken(user);
    // await sendEmail(
    //   email,
    //   "Sign Up Successful",
    //   "Congratulations! Your account has been created successfully.",
    //   "<h1>Sign Up Successful</h1><p>Congratulations! Your account has been created successfully.</p>"
    // );
    return token;
  }

  async loginUser({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError("Invalid email or password", 401);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError("Invalid email or password", 401);
    }
    const token = createToken(user);
    return token;
  }
}

export default new AuthService(User);
