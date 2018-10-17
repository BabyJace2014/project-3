/////////////////////////////////////////////////////////////////
// Dependencies
/////////////////////////////////////////////////////////////////

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();    // process.env
const mongoose = require("mongoose");
const users = require('./routes/users');

/////////////////////////////////////////////////////////////////
// Sets up the Express App
/////////////////////////////////////////////////////////////////

const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

/////////////////////////////////////////////////////////////////
// Initliazes the db connection
/////////////////////////////////////////////////////////////////

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/bookgroupz";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

/////////////////////////////////////////////////////////////////
// Sets the Express Routes & the App listening
/////////////////////////////////////////////////////////////////

// Routes
require("./routes/users.js")(app);
require("./routes/clubs.js")(app);
require("./routes/books.js")(app);

// Send every other request to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});