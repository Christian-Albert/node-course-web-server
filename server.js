const express = require('express');
const hbs = require('hbs');

var app = express();

// Make express use the hbs as its view engine
app.set('view engine', 'hbs');

// Add some middle-ware to serve static files
// The __dirname variable gives the path to the project directory
app.use(express.static(__dirname + '/public'));

// Set up GET request with req (request) and res (response) arguments
app.get('/', (req, res) => {
    res.render('home.hbs', {
       pageTitle: 'Home page',
       welcomeMessage: 'Welcome to the home page!',
       currentYear: new Date().getFullYear() 
    });
});

app.get('/about', (req, res) => {
    // Passing in objects that can be used in hbs template
    res.render('about.hbs', {
        pageTitle: 'About page',
        currentYear: new Date().getFullYear()
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