import { rateLimit } from "express-rate-limit";

interface RateLimitProps {
  windowMinutes: number;
  maxRequests: number;
}

export const createRateLimiter = ({
  windowMinutes,
  maxRequests,
}: RateLimitProps) => {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000, // wie lange der req gemerkt wird in ms => 15 min
    limit: maxRequests, // wie viele req erlaubt sind
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: "Too many requests, please try again later",
  });
};

export const loginLimiter = createRateLimiter({
  windowMinutes: 5,
  maxRequests: 5,
});

export const registerLimiter = createRateLimiter({
  windowMinutes: 10,
  maxRequests: 10,
});

export const resendVerificationLimiter = createRateLimiter({
  windowMinutes: 15,
  maxRequests: 3,
});

export const resetLimiter = createRateLimiter({
  windowMinutes: 15,
  maxRequests: 3,
});

export const refreshLimiter = createRateLimiter({
  windowMinutes: 1,
  maxRequests: 30,
});
