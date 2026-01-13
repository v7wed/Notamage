/**
 * Agent Service Authentication Middleware
 * Validates requests coming from the FastAPI LangGraph agent service
 * Uses a shared secret token for service-to-service authentication
 */

export function agentProtect(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Missing or invalid authorization header",
      });
    }

    const token = authHeader.split(" ")[1];
    const expectedSecret = process.env.AGENT_SERVICE_SECRET;

    if (!expectedSecret) {
      console.error("AGENT_SERVICE_SECRET not configured");
      return res.status(500).json({
        success: false,
        error: "Server configuration error",
      });
    }

    if (token !== expectedSecret) {
      return res.status(403).json({
        success: false,
        error: "Invalid service token",
      });
    }

    // Token is valid, proceed to the next middleware/controller
    next();
  } catch (error) {
    console.error("Error in agentServiceAuth middleware:", error);
    return res.status(500).json({
      success: false,
      error: "Authentication error",
    });
  }
}

