const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

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

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Under maintenance...',
        maintenanceMessage: 'The web-page is currently being updated'
    });
});

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

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill your request'
    });
});

// Bind the express app to specific port
app.listen(3030, () => {
    console.log('Express server is up on port 3030');
});