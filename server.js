const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Heroku will provide the port as the PORT environmental variable
// Using or, ||, operator to provide our own port when running locally
const port = process.env.PORT || 3030;

var app = express();

// Making use of partials, similar to Django templates
hbs.registerPartials(__dirname + '/views/partials');
// Make express use the hbs as its view engine
app.set('view engine', 'hbs');

// More middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFileSync('server.log', log + '\n', (err) => {
        console.log('Unable to append to server.log');
    });
    next();
});

/*
app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Under maintenance...',
        maintenanceMessage: 'The web-page is currently being updated'
    });
});
*/

// Add some middleware to serve static files
// The __dirname variable gives the path to the project directory
app.use(express.static(__dirname + '/public'));

// Register hbs helper methods
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// Set up GET request with req (request) and res (response) arguments
app.get('/', (req, res) => {
    res.render('home.hbs', {
       pageTitle: 'Home page',
       welcomeMessage: 'Welcome to the home page!',
    });
});

app.get('/about', (req, res) => {
    // Passing in objects that can be used in hbs template
    res.render('about.hbs', {
        pageTitle: 'About page',
    });
});

app.get('/projects', (req, res) => {
    res.render('base.hbs', {
        pageTitle: 'Portfolio page',
        welcomeMessage: 'This is where I can list some projects'
    });
});

app.get('/help', (req, res) => {
    res.render('base.hbs', {
        pageTitle: 'Help page',
        welcomeMessage: 'This is where some help might be found'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill your request'
    });
});

// Bind the express app to specific port set up above
app.listen(port, () => {
    console.log(`Express server is up on port ${port}`);
});