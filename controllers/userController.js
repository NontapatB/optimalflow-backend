const { createUser } = require('../services/userService');

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

async function loginUser(req, res){
    
}

module.exports = { postUser };
