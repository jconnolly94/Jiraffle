const jwt = require('jsonwebtoken');

module.exports = {
  authenticate: (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Access denied');

    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      res.status(400).send('Invalid token');
    }
  },

  isAdmin: (req, res, next) => {
    if (req.user?.role !== 'admin') return res.status(403).send('Forbidden');
    next();
  }
};