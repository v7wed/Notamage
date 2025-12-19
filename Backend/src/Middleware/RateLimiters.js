/*
export async function NoteLimit(req, res, next) {
  try {
    const identifier = //the token of the currently signed in user
    const { success, limit, remaining, resetDate } = await notelimiter.limit(
      identifier
    );
    if (success) {
      res.set({
        "X-RateLimit-Limit": limit,
        "X-RateLimit-Remaining": remaining,
        "X-RateLimit-Reset": new Date(resetDate).toISOString(),
      });
    } else {
      res.status(429).json({
        message: "too many note creation",
        resetsAt: new Date(resetDate).toISOString(),
      });
    }
    next();
  } catch (error) {
    console.error(`Error in NoteLimit middleware ${error}`);
    next(error);
  }
} */
