const rateLimitMap = new Map(); // Store IPs and timestamps

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = process.env.MAX_REQUEST_PER_IP;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const timestamps = rateLimitMap
    .get(ip)
    .filter((time) => now - time < windowMs);

  if (timestamps.length >= maxRequests) {
    return res.status(429).json({
      message: "Too many requests, please try again later.",
      suggestion: `Please come after ${windowMs / 60 / 1000} minutes `,
    });
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  next();
};

export { rateLimiter };
