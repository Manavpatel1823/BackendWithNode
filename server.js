require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const path = require("path");
const mongoose = require("mongoose")

//middleware
app.use(express.json());
app.use(express.static(__dirname));

//connect to MongoDB.
mongoose.connect(process.env.MONGODB_URI)
                .then(() => {console.log("Mongodb Connect.")})
                .catch((err) => {console.error("Connection error", err)});

//routers 
const personRoutes = require('./routes/personRoutes');

app.use('/', personRoutes);

app.get('/hello', (req, res) => {
    res.json({ message: "Hello from server 👋" });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});