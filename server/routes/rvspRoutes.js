const express = require("express");
const { protect } = require("../middleware/authMiddleware.js");
const { createOrUpdateRSVP, getRSVPsByEvent, getUserRSVPs } = ("../controllers/rsvpController.js");

const router = express.Router();

router.post("/", protect, createOrUpdateRSVP);
router.get("/event/:eventId", protect, getRSVPsByEvent);
router.get("/user/:userId", protect, getUserRSVPs);

module.exports = router;
