const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// method for token generation
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

// signup new user logic
const signupUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // check if email is in use
        const userExists = await User.findOne({email});

        if (userExists)
            return res.status(400).json({ message: "User already exists" });

        // create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword, role});

        res.status(201).json({
            token: generateToken(user._id),
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
    });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// user login logic
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        const checkPass = bcrypt.compare(password, user.password);

        // check if email and pass match
        if (user && checkPass) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }


    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}