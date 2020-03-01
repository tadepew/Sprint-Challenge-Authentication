const db = require("../database/dbConfig");

module.exports = {
  add,
  findBy
};

function add(user) {
  return db("users").insert(user);
}

function findBy(query) {
  return db("users")
    .where(query)
    .first();
}
