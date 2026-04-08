export default function validateTask(isUpdate = false) {
  return (req, res, next) => {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      projectId,
      assignedTo,
      createdBy,
      tags,
    } = req.body;

    const errors = [];

    if (!isUpdate) {
      if (!title) errors.push("title is required");
      if (!projectId) errors.push("projectId is required");
      if (!createdBy) errors.push("createdBy is required");
    } else {
      const allowed = [
        "title",
        "description",
        "status",
        "priority",
        "dueDate",
        "projectId",
        "assignedTo",
        "createdBy",
        "tags",
      ];
      const hasAtLeastOneField = allowed.some((field) => req.body[field] !== undefined);

      if (!hasAtLeastOneField) {
        errors.push("At least one valid field is required for update");
      }
    }

    if (title !== undefined && typeof title !== "string") {
      errors.push("title must be a string");
    }

    if (description !== undefined && typeof description !== "string") {
      errors.push("description must be a string");
    }

    if (
      status !== undefined &&
      !["pending", "in-progress", "completed"].includes(status)
    ) {
      errors.push("status must be pending, in-progress, or completed");
    }

    if (
      priority !== undefined &&
      !["low", "medium", "high"].includes(priority)
    ) {
      errors.push("priority must be low, medium, or high");
    }

    if (dueDate !== undefined && Number.isNaN(Date.parse(dueDate))) {
      errors.push("dueDate must be a valid date");
    }

    if (tags !== undefined && !Array.isArray(tags)) {
      errors.push("tags must be an array");
    }

    if (assignedTo !== undefined && assignedTo !== null && typeof assignedTo !== "string") {
      errors.push("assignedTo must be a string ObjectId");
    }

    if (projectId !== undefined && typeof projectId !== "string") {
      errors.push("projectId must be a string ObjectId");
    }

    if (createdBy !== undefined && typeof createdBy !== "string") {
      errors.push("createdBy must be a string ObjectId");
    }

    if (errors.length) {
      return res.status(400).json({
        success: false,
        message: "Task validation failed",
        errors,
      });
    }

    next();
  };
}