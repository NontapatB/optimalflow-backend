const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/users.json');

function readUsers() {

  // Check if the file exists, if not return an empty array
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);

}

function writeUsers(users) {

  // Write the users array to the file
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

}

module.exports = { readUsers, writeUsers };