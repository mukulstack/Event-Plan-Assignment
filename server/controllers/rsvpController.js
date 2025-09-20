const mongoose = require("mongoose");
const RSVP = require("../models/rsvpModel");

// Create or update RSVP
const createOrUpdateRSVP = async (req, res) => {
  try {
    const { eventId, status } = req.body;
    const userId = req.user._id; // because of protect middleware

    let rsvp = await RSVP.findOne({ user: userId, event: eventId });

    if (rsvp) {
      rsvp.status = status;
      await rsvp.save();
    } else {
      rsvp = new RSVP({ user: userId, event: eventId, status });
      await rsvp.save();
    }

    res.json({ message: "RSVP saved", rsvp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving RSVP" });
  }
};

// ✅ Get RSVP summary for an event
const getRSVPsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const summary = await RSVP.aggregate([
      { $match: { event: new mongoose.Types.ObjectId(eventId) } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    // initialize with 0
    const result = { Going: 0, Maybe: 0, Decline: 0 };
    summary.forEach(s => {
      result[s._id] = s.count;
    });

    res.json({ summary: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching RSVP summary" });
  }
};

// Get all RSVPs of a user
const getUserRSVPs = async (req, res) => {
  try {
    const { userId } = req.params;
    const rsvps = await RSVP.find({ user: userId }).populate("event");
    res.json(rsvps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user RSVPs" });
  }
};

module.exports = {
  createOrUpdateRSVP,
  getRSVPsByEvent,
  getUserRSVPs,
};
