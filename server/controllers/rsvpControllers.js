const RSVP = require("../models/RSVP.js");

const createOrUpdateRSVP = async (req, res) => {
  try {
    const { event, status } = req.body;
    const rsvp = await RSVP.findOneAndUpdate(
      { event, user: req.user._id },
      { status },
      { new: true, upsert: true }
    );
    res.json(rsvp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRSVPsByEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const rsvps = await RSVP.find({ event: eventId });
    const summary = {
      Going: rsvps.filter(r => r.status === "Going").length,
      Maybe: rsvps.filter(r => r.status === "Maybe").length,
      Decline: rsvps.filter(r => r.status === "Decline").length,
    };
    res.json({ summary, rsvps });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserRSVPs = async (req, res) => {
  try {
    const rsvps = await RSVP.find({ user: req.params.userId }).populate("event");
    res.json(rsvps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    createOrUpdateRSVP, getRSVPsByEvent, getUserRSVPs
}