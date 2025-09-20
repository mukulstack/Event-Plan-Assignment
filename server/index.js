const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const rsvpRoutes = require("./routes/rsvpRoutes"); 

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// using env variables
dotenv.config();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/rsvp", rsvpRoutes); // optional: match your frontend fetch

// connection to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Mongodb connected"))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
});
