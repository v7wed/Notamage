import { notelimiter, loginLimiter, reglimiter, generalGetLimiter, apiLimiter, chatLimiter } from "../Config/upstash.js";

export async function NoteLimit(req, res, next) {
  if (process.env.NODE_ENV === 'test') {
    return next();
  }

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

// Prevent brute force login attacks
export async function LoginLimit(req, res, next) {
  if (process.env.NODE_ENV === 'test') {
    return next();
  }

  try {
    const identifier = `loginLimit:${req.body.Email}`;
    const { success, limit, remaining, reset } = await loginLimiter.limit(identifier);
    
    if (!success) {
      return res.status(429).json({
        message: "Too many login attempts. Please try again later.",
        resetsAt: new Date(reset).toISOString(),
      });
    }
    
    res.set({
      "X-RateLimit-Limit": limit,
      "X-RateLimit-Remaining": remaining,
      "X-RateLimit-Reset": new Date(reset).toISOString(),
    });
    
    next();
  } catch (error) {
    console.error(`Error in LoginLimit middleware: ${error}`);
    next(error);
  }
}

// Prevent signup spam - IP-based rate limiting
export async function SignupLimit(req, res, next) {
  if (process.env.NODE_ENV === 'test') {
    return next();
  }

  try {
    // Use IP address as identifier (works across different emails)
    const clientIP = req.ip || req.socket.remoteAddress;
    const identifier = `signupLimit:${clientIP}`;
    const { success, limit, remaining, reset } = await reglimiter.limit(identifier);
    
    if (!success) {
      return res.status(429).json({
        message: "Too many signup attempts. Please try again later.",
        resetsAt: new Date(reset).toISOString(),
      });
    }
    
    res.set({
      "X-RateLimit-Limit": limit,
      "X-RateLimit-Remaining": remaining,
      "X-RateLimit-Reset": new Date(reset).toISOString(),
    });
    
    next();
  } catch (error) {
    console.error(`Error in SignupLimit middleware: ${error}`);
    next(error);
  }
}

// Prevent static file spam - IP-based rate limiting
export async function GeneralGetLimit(req, res, next) {
  if (process.env.NODE_ENV === 'test') {
    return next();
  }

  try {
    const clientIP = req.ip || req.socket.remoteAddress;
    const identifier = `generalGet:${clientIP}`;
    const { success, limit, remaining, reset } = await generalGetLimiter.limit(identifier);
    
    if (!success) {
      return res.status(429).json({
        message: "Too many requests. Please slow down.",
        resetsAt: new Date(reset).toISOString(),
      });
    }
    
    res.set({
      "X-RateLimit-Limit": limit,
      "X-RateLimit-Remaining": remaining,
      "X-RateLimit-Reset": new Date(reset).toISOString(),
    });
    
    next();
  } catch (error) {
    console.error(`Error in GeneralGetLimit middleware: ${error}`);
    next(error);
  }
}

// Gentle rate limit for authenticated API routes - prevents abuse without impacting normal usage
export async function ApiLimit(req, res, next) {
  if (process.env.NODE_ENV === 'test') {
    return next();
  }

  try {
    // Use user ID from JWT token for authenticated routes
    const userId = req.user?._id || req.ip || req.socket.remoteAddress;
    const identifier = `apiLimit:${userId}`;
    const { success, limit, remaining, reset } = await apiLimiter.limit(identifier);
    
    if (!success) {
      return res.status(429).json({
        message: "Too many requests. Please slow down.",
        resetsAt: new Date(reset).toISOString(),
      });
    }
    
    res.set({
      "X-RateLimit-Limit": limit,
      "X-RateLimit-Remaining": remaining,
      "X-RateLimit-Reset": new Date(reset).toISOString(),
    });
    
    next();
  } catch (error) {
    console.error(`Error in ApiLimit middleware: ${error}`);
    next(error);
  }
}

// Protect LLM API costs - strict limit on chat messages
export async function ChatLimit(req, res, next) {
  if (process.env.NODE_ENV === 'test') {
    return next();
  }

  try {
    // Use user ID from JWT token
    const userId = req.user?._id || req.ip || req.socket.remoteAddress;
    const identifier = `chatLimit:${userId}`;
    const { success, limit, remaining, reset } = await chatLimiter.limit(identifier);
    
    if (!success) {
      return res.status(429).json({
        message: "Too many chat messages. Please wait a moment before continuing the conversation.",
        resetsAt: new Date(reset).toISOString(),
      });
    }
    
    res.set({
      "X-RateLimit-Limit": limit,
      "X-RateLimit-Remaining": remaining,
      "X-RateLimit-Reset": new Date(reset).toISOString(),
    });
    
    next();
  } catch (error) {
    console.error(`Error in ChatLimit middleware: ${error}`);
    next(error);
  }
}
