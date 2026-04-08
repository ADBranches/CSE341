import mongoose from "mongoose";

export default function validateObjectId(paramName = "id", label = "resource") {
  return (req, res, next) => {
    const value = req.params[paramName];

    if (!mongoose.isValidObjectId(value)) {
      return res.status(400).json({
        success: false,
        message: `Invalid ${label} ID`,
      });
    }

    next();
  };
}