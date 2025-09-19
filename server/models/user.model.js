const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// defining schema for user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        require: true,
    },

    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User",
    },
}, {timestamps: true});

// creating model and exporting
const User = mongoose.model("User", userSchema);

module.exports = User;