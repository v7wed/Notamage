import ratelimit from "../Config/upstash.js";

const theLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit-key");

    if (!success) return res.status(429).json({ message: "too many requests" });
    next();
  } catch (error) {
    console.error("error in theLimiter function", error);
    next(error);
  }
};

export default theLimiter;
