export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ error: 'Access forbidden. Admins only.' });
    }
    next();
  };
  