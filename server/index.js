const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// using env variables
dotenv.config();


// routes


app.get("/", (req, res) => {
    res.send("HI");
})



const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
})

