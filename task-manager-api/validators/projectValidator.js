export default function validateProject(isUpdate = false) {
  return (req, res, next) => {
    const { name, ownerId, description, status, startDate, endDate } = req.body;
    const errors = [];

    if (!isUpdate) {
      if (!name) errors.push("name is required");
      if (!ownerId) errors.push("ownerId is required");
    } else {
      const allowedFields = [
        "name",
        "ownerId",
        "description",
        "status",
        "startDate",
        "endDate",
      ];

      const hasAtLeastOneField = allowedFields.some(
        (field) => req.body[field] !== undefined
      );

      if (!hasAtLeastOneField) {
        errors.push("At least one valid field is required for update");
      }
    }

    if (name !== undefined && typeof name !== "string") {
      errors.push("name must be a string");
    }

    if (ownerId !== undefined && typeof ownerId !== "string") {
      errors.push("ownerId must be a string ObjectId");
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

    const parsedStartDate =
      startDate !== undefined ? Date.parse(startDate) : undefined;
    const parsedEndDate =
      endDate !== undefined ? Date.parse(endDate) : undefined;

    if (startDate !== undefined && Number.isNaN(parsedStartDate)) {
      errors.push("startDate must be a valid date");
    }

    if (endDate !== undefined && Number.isNaN(parsedEndDate)) {
      errors.push("endDate must be a valid date");
    }

    if (
      startDate !== undefined &&
      endDate !== undefined &&
      !Number.isNaN(parsedStartDate) &&
      !Number.isNaN(parsedEndDate) &&
      parsedEndDate < parsedStartDate
    ) {
      errors.push("endDate cannot be earlier than startDate");
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