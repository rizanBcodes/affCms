const express = require('express');
const app = express();
const ejs = require('ejs');
const port = 4000;
const connection = require('./database.js')
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set(
    'view engine',
    'ejs'
)

app.use(express.static('public'));


connection.connect((err) => {
    if (err) {
      console.log("Database Connection Failed !!!", err);
    } else {
      console.log("connected to Database");
    }
});

app.listen(port);

app.post('/addpost', urlencodedParser, (req, res) => {
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

})

app.get(
    '/about',
    (req, res) => {
        console.log('inside about route')

        res.render('about',
            {
                title: 'About Affcms'
            })
    }
)

app.get(
    '/contact',
    (req, res) => {
        console.log('inside contact route')

        res.render('contact',
            {
                title: 'Contact'
            })
    }
)

app.get(
    '/privacy-policy',
    (req, res) => {
        res.render('privacy-policy',
            {
                title: 'Privacy'
            })
    }
)

app.get(
    '/addpost',
    (req, res) => {
        console.log('inside add post route');
        res.render('addpost');
    }
)


app.get(
    '/',
    (req, res) => {
        connection.query(`select * from blogs`,
            (error, results) => {
                if (error) console.log(error);
                console.log('inside root route');
                res.render(
                    'index',
                    {
                        title: 'Home page',
                        blogs: results
                    }
                )
            }
        )

    }
)

app.get(
    '/:slug',
    (req, res) => {
        console.log('inside :slug route');
        slug = req.params.slug;
        connection.query(`select * from blogs where slug='${slug}'`,
            (error, results) => {
                if (error) console.log(error);
                res.render(
                    'details',
                    {
                        title: results[0].title,
                        description: results[0].description
                    }
                )
            }
        )
    }
)

