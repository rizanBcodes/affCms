const ejs = require("ejs");
const connection = require("./database.js");
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const aboutController = (req, res) => {
    console.log('inside about route');
    res.render('about',
        {
            title: 'About Affcms'
        })
};

const contactController = (req, res) => {
    console.log("inside contact route");
  
    res.render("contact", {
      title: "Contact",
    });
  };

  const privacyPolicyController = (req, res) => {
    res.render("privacy-policy", {
      title: "Privacy",
    });
  };

module.exports = {
    aboutController,
    contactController,
    privacyPolicyController
}