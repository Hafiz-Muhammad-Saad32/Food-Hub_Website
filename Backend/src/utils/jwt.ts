import jwt from "jsonwebtoken";

export function generateJWT(payload: any) {
  const secret = process.env.JWT_SECRET || "123";
  return jwt.sign(payload, secret, { expiresIn: "1h" });
}
export function jwtCampare(token: string) {
  const secret = process.env.JWT_SECRET || "123";
  return jwt.verify(token, secret);
}

// 📩 Email Verification Token
export function generateEmailToken(userId: string) {
  const secret = process.env.JWT_SECRET || "123";
  return jwt.sign(
    { id: userId, type: "emailVerify" }, // type for extra security
    secret,
    { expiresIn: "1d" }, // 1 day valid
  );
}
