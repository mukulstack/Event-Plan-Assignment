const mongoose = require("mongoose");

// defining rsvp schema
const rsvpSchema = new mongoose.Schema({
    // ref to the event
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
    },
    // ref to the user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["Going", "Maybe", "Decline"],
        required: true,
    },
}, {timestamps: true});


// preventing duplicating of RSVPs 
// used chatGPT
rsvpSchema.index({ event: 1, user: 1}, {unique: true});

// creating the model
const RSVP = mongoose.model("RSVP", rsvpSchema);

module.exports = RSVP;
