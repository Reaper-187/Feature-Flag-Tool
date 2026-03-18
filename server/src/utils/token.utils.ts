import jwt, { SignOptions } from "jsonwebtoken";

const jwt_secret = process.env.JWT_SECRET;
const jwt_exp_in = process.env.JWT_EXP_IN || "1h";

if (!jwt_secret) {
  throw new Error("JWT_SECRET is not defined");
}

export const generateToken = (user_id: string): string => {
  const payload = { user_id };

  const options: SignOptions = {
    expiresIn: jwt_exp_in as SignOptions["expiresIn"],
  };
  // Durch den Cast auf SignOptions["expiresIn"] sagst du TypeScript trust me dawg dieser Wert ist kompatibel.

  const token = jwt.sign(payload, jwt_secret, options);

  return token;
};

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, jwt_secret);
  return decoded as { user_id: string };
};
