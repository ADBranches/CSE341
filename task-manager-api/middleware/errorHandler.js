function createError(status, message, details = null) {
  const error = new Error(message);
  error.status = status;

  if (details) {
    error.details = details;
  }

  return error;
}

function notFoundHandler(req, res, next) {
  return res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
}

function errorHandler(err, req, res, next) {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON payload",
    });
  }

  const status = err.status || 500;

  const payload = {
    success: false,
    message: err.message || "Internal server error",
  };

  if (err.details && process.env.NODE_ENV !== "production") {
    payload.error = err.details;
  }

  return res.status(status).json(payload);
}

export { createError, notFoundHandler, errorHandler };
export default errorHandler;