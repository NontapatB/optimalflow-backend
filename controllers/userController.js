const { createUser, loginUser, getAllUsers } = require('../services/userService');

async function postUser(req, res) {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const user = await createUser(name, email, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function postLogin(req, res){
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const user = await loginUser(email, password);
    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}

async function getUsers(req, res) {
  try {
    const users = getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve users' });
  }
}

module.exports = { postUser, postLogin, getUsers };
