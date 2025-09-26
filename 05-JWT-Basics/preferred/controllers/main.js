const jwt = require('jsonwebtoken');

exports.logon = (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ message: 'name and password are required' });
  }

  const token = jwt.sign({ name }, process.env.SECRET, { expiresIn: '24h' });

  return res.status(200).json({ token });
};

exports.hello = (req, res) => {
  res.status(200).json({ message: `Hello, ${req.user.name}!` });
};