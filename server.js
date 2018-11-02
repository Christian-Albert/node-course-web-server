const express = require('express');

var app = express();

// Set up GET request with req (request) and res (response) arguments
app.get('/', (req, res) => {
    //res.send('<h1>Hello from express!</h1>');
    res.send({
        name: 'Christian',
        food: [
            'pizza',
            'burger',
            'sandwich'
        ]
    });
});

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>');
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill your request'
    });
});

// Bind the express app to specific port
app.listen(3030);