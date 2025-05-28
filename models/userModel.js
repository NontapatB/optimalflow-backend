class User {

  constructor(id, name, email, password, balance = 100) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.balance = balance;
  }
  
}

module.exports = User;
