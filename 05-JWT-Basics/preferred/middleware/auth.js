const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = { name: decoded.name };
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'unauthorized' });
  }
};