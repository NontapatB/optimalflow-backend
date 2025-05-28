const { createUser, loginUser, getAllUsers, getUserById, transferBalance, generateToken } = require('../services/userService');

async function postUser(req, res) {

  const { name, email, password } = req.body;
  
  // Validate input
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

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  // Login user and generate token
  try {
    const user = await loginUser(email, password);
    const token = generateToken(user.id);
    res.status(200).json({token, user});
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}

async function getUsers(req, res) {

  // Get all users
  try {
    const users = getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve users' });
  }
}

async function getUserByIdHandler(req, res) {

  const { id } = req.params;

  // Get user by ID
  try {
    const user = await getUserById(id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

function postTransfer(req, res) {

  const { fromId, toId, amount } = req.body;
  
  // Validate transfer request
  if (!fromId || !toId || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ message: 'Invalid transfer request' });
  }

  // Transfer balance
  try {
    const result = transferBalance(fromId, toId, amount);
    res.status(200).json(result);
  } catch (err) {
    console.error('Transfer error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
}

module.exports = { postUser, 
                   postLogin, 
                   getUsers, 
                   getUserByIdHandler, 
                   postTransfer };