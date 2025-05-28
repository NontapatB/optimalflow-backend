const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');
const { readUsers, writeUsers } = require('../utils/fileStorage');

async function createUser(name, email, password) {
  const users = readUsers();
  if (users.find(u => u.email === email)) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User(uuidv4(), name, email, hashedPassword);
  users.push(newUser);
  writeUsers(users);
  const { password: _, ...safeUser } = newUser;
  return safeUser;
}

module.exports = { createUser };
