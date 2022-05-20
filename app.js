const express = require("express");
const app = express();
const ejs = require("ejs");
const port = 4000;
const connection = require("./database.js");
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const postControllers = require("./controllers/postControllers");
const pageControllers = require("./controllers/pageControllers");

app.set("view engine", "ejs");

app.use(express.static("public"));

connection.connect((err) => {
  if (err) {
    console.log("db connection has been refused, this is the error message:", err.message);
  } else {
    console.log("connected to Database");
  }
});

app.listen(port);

app.post("/addpost", urlencodedParser, postControllers.addPostController);

app.get("/about", pageControllers.aboutController);

app.get("/contact", pageControllers.contactController);

app.get("/privacy-policy", pageControllers.privacyPolicyController);

app.get("/addpost", postControllers.addPostRouteController);

app.get("/", postControllers.showAllController);

app.get("/:slug", postControllers.slugController);
