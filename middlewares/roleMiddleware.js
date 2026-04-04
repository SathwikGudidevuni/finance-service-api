const allowRoles = (allowRoles) => {
  return (req, res, next) => {
    const userRole = req.headers.role;

    if (!userRole) {
      return res.status(401).json({
        message: "Role is required in request headers"
      });
    }

    if (!allowRoles.includes(userRole)) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    next();
  };
};

module.exports = allowRoles;
