export default function validateComment(isUpdate = false) {
  return (req, res, next) => {
    const { taskId, userId, content } = req.body;
    const errors = [];

    if (!isUpdate) {
      if (!taskId) errors.push("taskId is required");
      if (!userId) errors.push("userId is required");
      if (!content) errors.push("content is required");
    } else {
      const allowed = ["taskId", "userId", "content"];
      const hasAtLeastOneField = allowed.some((field) => req.body[field] !== undefined);

      if (!hasAtLeastOneField) {
        errors.push("At least one valid field is required for update");
      }
    }

    if (taskId !== undefined && typeof taskId !== "string") {
      errors.push("taskId must be a string ObjectId");
    }

    if (userId !== undefined && typeof userId !== "string") {
      errors.push("userId must be a string ObjectId");
    }

    if (content !== undefined && typeof content !== "string") {
      errors.push("content must be a string");
    }

    if (errors.length) {
      return res.status(400).json({
        success: false,
        message: "Comment validation failed",
        errors,
      });
    }

    next();
  };
}