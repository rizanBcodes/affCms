const connection = require('../database');
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const ejs = require("ejs");

const addPostController = (req, res) => {
    console.log('backend got an api hit at addpost');
    console.log('starting query')
    connection.query(`insert into blogs(slug, title, description) values (?, ?, ?)`,
        [req.body.postSlug, req.body.postTitle, req.body.postDescr],
        (error, results) => {
            if (error) console.log(error);
            console.log('inserted these values into test database')
            console.log(req.body.postSlug);
            console.log(req.body.postTitle);
            console.log(req.body.postDescr);
            console.log('ending connection');
        }
    )

};

const addPostRouteController = (req, res) => {
    console.log("inside add post route");
    res.render("addpost");
  };

  const showAllController = (req, res) => {
    connection.query(`select * from blogs`, (error, results) => {
      if (error) console.log(error);
      console.log("inside root route");
      res.render("index", {
        title: "Home page",
        blogs: results,
      });
    });
  };

  const SlugController = (req, res) => {
    console.log("inside :slug route");
    slug = req.params.slug;
    connection.query(
      `select * from blogs where slug='${slug}'`,
      (error, results) => {
        if (error) console.log(error);
        res.render("details", {
          title: results[0].title,
          description: results[0].description,
        });
      }
    );
  };

module.exports = {
    addPostController,
    addPostRouteController,
    showAllController, 
    slugController
}