export default function requireAuth(req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated() || !req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  next();
}