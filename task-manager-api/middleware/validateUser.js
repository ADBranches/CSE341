function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateUser(isUpdate = false) {
  return (req, res, next) => {
    const { firstName, lastName, email, role, phone, isActive } = req.body;

    if (!isUpdate) {
      if (!firstName || !lastName || !email || !role || !phone) {
        return res.status(400).json({
          message: 'firstName, lastName, email, role, and phone are required'
        });
      }
    } else {
      const allowed = ['firstName', 'lastName', 'email', 'role', 'phone', 'isActive'];
      const hasAtLeastOneField = allowed.some((field) => req.body[field] !== undefined);

      if (!hasAtLeastOneField) {
        return res.status(400).json({
          message: 'At least one valid field is required for update'
        });
      }
    }

    if (email !== undefined && !validateEmail(email)) {
      return res.status(400).json({
        message: 'Invalid email format'
      });
    }

    if (role !== undefined && !['admin', 'user'].includes(role)) {
      return res.status(400).json({
        message: 'role must be admin or user'
      });
    }

    if (isActive !== undefined && typeof isActive !== 'boolean') {
      return res.status(400).json({
        message: 'isActive must be a boolean'
      });
    }

    next();
  };
}

export default validateUser;