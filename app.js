const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {

});

app.listen(3000, (req, res) => {
  console.log("Server has started on port 3000");
});
