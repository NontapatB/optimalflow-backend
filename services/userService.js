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

async function loginUser(email, password) {
  const users = readUsers();
  const user = users.find(u => u.email === email);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  const { password: _, ...safeUser } = user;
  return safeUser;
}

function getAllUsers() {
  const users = readUsers();
  return users.map(({ password, ...rest }) => rest); // ลบ password ออก
}

module.exports = { createUser, loginUser, getAllUsers };
