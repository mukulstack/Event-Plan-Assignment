const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

// creating protected routes
const protect = async (req, res, next) => {
    // check token from the user request
    let token = req.headers.authorization?.split(" ")[1];

    // if no token
    if (!token) 
        return res.status(401).json({message: "Not Authorized"});
    
    // now verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // select user without the password and pass to next middleware
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });    
    }
}

const isAdmin = (req, res, next) => {
      if (req.user && req.user.role === "Admin") {
        next();
    } else {
        res.status(403).json({ message: "Admin access only" });
    }
}

module.exports = {protect, isAdmin}