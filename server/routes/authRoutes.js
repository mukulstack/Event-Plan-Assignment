const express = require("express")
const { signupUser, loginUser} = require("../controllers/authController.js")

// creating router
const router = express.Router();

//post methods and middleware for controllers
router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports = router;