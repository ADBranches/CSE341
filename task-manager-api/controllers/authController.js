export const getCurrentUser = (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated() || !req.user) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }

  return res.status(200).json({
    success: true,
    data: req.user,
  });
};

export const logoutUser = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    if (!req.session) {
      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    }

    req.session.destroy((sessionError) => {
      if (sessionError) {
        return next(sessionError);
      }

      res.clearCookie("connect.sid");

      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    });
  });
};

export const authFailure = (req, res) => {
  return res.status(401).json({
    success: false,
    message: "OAuth authentication failed",
  });
};

export const authSuccessRedirect = (req, res) => {
  return res.redirect("/auth/me");
};