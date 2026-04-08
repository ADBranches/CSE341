export default function validateProject(isUpdate = false) {
  return (req, res, next) => {
    const { name, ownerId, description, status, startDate, endDate } = req.body;
    const errors = [];

    if (!isUpdate) {
      if (!name) errors.push("name is required");
      if (!ownerId) errors.push("ownerId is required");
    } else {
      const allowed = ["name", "ownerId", "description", "status", "startDate", "endDate"];
      const hasAtLeastOneField = allowed.some((field) => req.body[field] !== undefined);

      if (!hasAtLeastOneField) {
        errors.push("At least one valid field is required for update");
      }
    }

    if (name !== undefined && typeof name !== "string") {
      errors.push("name must be a string");
    }

    if (description !== undefined && typeof description !== "string") {
      errors.push("description must be a string");
    }

    if (
      status !== undefined &&
      !["planning", "active", "on-hold", "completed"].includes(status)
    ) {
      errors.push("status must be planning, active, on-hold, or completed");
    }

    if (startDate !== undefined && Number.isNaN(Date.parse(startDate))) {
      errors.push("startDate must be a valid date");
    }

    if (endDate !== undefined && Number.isNaN(Date.parse(endDate))) {
      errors.push("endDate must be a valid date");
    }

    if (errors.length) {
      return res.status(400).json({
        success: false,
        message: "Project validation failed",
        errors,
      });
    }

    next();
  };
}