function validateTask(isUpdate = false) {
  return (req, res, next) => {
    const {
      title,
      description,
      status,
      priority,
      category,
      dueDate,
      assignedTo
    } = req.body;

    if (!isUpdate) {
      if (!title || !description || !status || !priority || !category || !dueDate || !assignedTo) {
        return res.status(400).json({
          message: 'title, description, status, priority, category, dueDate, and assignedTo are required'
        });
      }
    } else {
      const allowed = [
        'title',
        'description',
        'status',
        'priority',
        'category',
        'dueDate',
        'assignedTo'
      ];

      const hasAtLeastOneField = allowed.some((field) => req.body[field] !== undefined);

      if (!hasAtLeastOneField) {
        return res.status(400).json({
          message: 'At least one valid field is required for update'
        });
      }
    }

    if (status !== undefined && !['pending', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).json({
        message: 'status must be pending, in-progress, or completed'
      });
    }

    if (priority !== undefined && !['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({
        message: 'priority must be low, medium, or high'
      });
    }

    if (dueDate !== undefined && Number.isNaN(Date.parse(dueDate))) {
      return res.status(400).json({
        message: 'dueDate must be a valid date'
      });
    }

    next();
  };
}

export default validateTask;