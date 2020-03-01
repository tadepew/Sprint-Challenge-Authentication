const router = require("express").Router();
const Users = require("./auth-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { jwtSecret } = require("../config/secrets");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  console.log(req.body);

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ message: `Welcome ${user.username}`, token });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      console.log("Error:", error);
      res.status(500).json({ error: "/login error" });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
