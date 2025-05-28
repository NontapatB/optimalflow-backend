const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');
const { readUsers, writeUsers } = require('../utils/fileStorage');
const jwt = require('jsonwebtoken');

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

function getUserById(id) {
  const users = readUsers();
  const user = users.find(user => user.id === id);
  if(!user) throw new Error('User not found');
  const { password, ...safeUser } = user;

  return safeUser
}

function transferBalance(fromId, toId, amount) {

  const users = readUsers();

  console.log("TRANSFER DEBUG: fromId =", fromId);
  console.log("TRANSFER DEBUG: toId =", toId);
  console.log("TRANSFER DEBUG: All user IDs =", users.map(u => u.id));

  if (fromId === toId) {
    throw new Error('Cannot transfer to the same account');
  }

  const fromUser = users.find(user => user.id === fromId);
  const toUser = users.find(user => user.id === toId);

  if (!fromUser || !toUser) {
    throw new Error('One or both users not found');
  }

  if (typeof amount !== 'number' || amount <= 0) {
    throw new Error('Invalid transfer amount');
  }

  if (fromUser.balance < amount) {
    throw new Error('Insufficient balance');
  }

  fromUser.balance -= amount;
  toUser.balance += amount;

  writeUsers(users);
  return {
    message: 'Transfer successful',
    from: { id: fromUser.id, balance: fromUser.balance },
    to: { id: toUser.id, balance: toUser.balance },
    amount: amount
  };

}

function generateToken(userId) {
  return jwt.sign({ id: userId}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h'});
}

module.exports = { createUser, loginUser, getAllUsers, getUserById, transferBalance, generateToken };
