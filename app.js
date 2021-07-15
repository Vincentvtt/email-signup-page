const express = require("express");
const app = express();
const https = require("https");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const API_KEY = "056131b7e7c633395f65cc13cde20902-us6";
const LIST_ID = "65f6f1928f";
const URL = "https://us6.api.mailchimp.com/3.0/lists/" + LIST_ID + "?skip_merge_validation=true";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const options = {
      method: "POST",
      auth: "vincent:" + API_KEY
  }

  const request = https.request(URL, options, (response) => {
    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname + "/failure.html");
    }
  })
  request.write(jsonData);
  request.end();
});

app.post("/redirect", (req, res) => {
    res.redirect("/");
})

app.listen(3000, (req, res) => {
  console.log("Server has started on port 3000");
});
