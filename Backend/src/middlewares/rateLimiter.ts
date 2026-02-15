import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";

export const globalLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // sirf 5 attempts
  message: {
    success: false,
    message: "Too many login/signup attempts. Try again after 10 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
