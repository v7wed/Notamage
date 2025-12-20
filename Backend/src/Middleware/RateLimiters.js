import { notelimiter } from "../Config/upstash.js";
export async function NoteLimit(req, res, next) {
  try {
    const identifier = `noteLimit: ${req.body.userID}`;
    const { success, limit, remaining, reset } = await notelimiter.limit(
      identifier
    );
    if (success) {
      res.set({
        "X-RateLimit-Limit": limit,
        "X-RateLimit-Remaining": remaining,
        "X-RateLimit-Reset": new Date(reset).toISOString(),
      });
    } else {
      res.status(429).json({
        message: "too many note creation",
        resetsAt: new Date(reset).toISOString(),
      });
    }
    next();
  } catch (error) {
    console.error(`Error in NoteLimit middleware ${error}`);
    next(error);
  }
}
