exports.authorizeRolesForGuestAdmin = (allowedRoles) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (!role  || !allowedRoles.includes(role)) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    next();
  };
};

exports.accessForEveryAdmin = (allowedRoles) => {
    console.log(allowedRoles)
  return (req, res, next) => {
    const { role } = req.user;
    console.log('role user',role,req.user);
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    next();
  };
};

exports.authorizeRolesForMainAdmin = (allowedRoles) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    next();
  };
};
