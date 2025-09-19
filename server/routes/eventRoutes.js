const express = require("express");
const { protect, isAdmin } = require("../middleware/authMiddleware.js");
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require ("../controllers/eventController.js");

const router = express.Router();

router.post("/", protect, isAdmin, createEvent);
router.get("/", protect, getEvents);
router.get("/:id", protect, getEventById);
router.put("/:id", protect, isAdmin, updateEvent);
router.delete("/:id", protect, isAdmin, deleteEvent);

module.exports = router;
