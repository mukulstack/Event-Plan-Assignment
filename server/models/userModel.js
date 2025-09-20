const mongoose = require("mongoose");

// defining schema for user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {               
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User",
    }
}, { timestamps: true });

// creating model and exporting
const User = mongoose.model("User", userSchema);
module.exports = User;
