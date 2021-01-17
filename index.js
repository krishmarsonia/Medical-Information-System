const express = require("express");

// const http = require('http');

const ejslint = require("ejs");

const bodyParser = require("body-parser");

const path = require("path"); //just for path

const fs = require("fs");

const medicineRoutes = require("./routes/medicine");
const aboutusRoutes = require("./routes/aboutus");
const shopRoutes = require("./routes/shop");


const port = process.env.PORT || 7000;

const app = express();

app.use(medicineRoutes);
app.use(aboutusRoutes);
app.use(shopRoutes);

app.set("view engine", "ejs");
app.set("views", "krinix/views");

app.use(bodyParser.urlencoded({ extended: false })); //this is to parse the request that has came from the user see line 44 in index.js(in this file only)!!

app.use(express.static(__dirname + "/krinix")); //this is for sending file don't worry

// app.use((req, res, next) => {
//     console.log(req.headers);
//     res.statusCode = 200;
//     res.setHeader('Content-type', 'text/html');
//     res.end("<html><body><h1>Now working with express.</h1><body></html>");
// });

// app.use("/test", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "/krinix", "/views", "/test.html"));
// });

// app.post("/test-2", (req, res, next) => {
//   console.log(req.body);
//   if (req.body.firstname == "Krish") {
//     res.redirect("/");
//   } else {
//     res.redirect("/aboutus");
//   }
// });

app.use((err,req, res, next) => {
  // res.statusCode = 404;
  // res.sendFile(path.join(__dirname, '/krinix', '/views', '/404.html'));
  res.status(404).render("404", { pageTitle: "404 Not found" });
});

// const server = http.createServer(app);

app.listen(port, () => {
  console.log("Server running");
});
