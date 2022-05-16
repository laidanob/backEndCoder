const express = require("express");
const bodyParser = require("body-parser");

// Create Express App
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/not.html");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use("/api", routes);

// Listen on port 8080
app.listen(8080, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});