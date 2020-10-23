const express = require('express');

const app = express();

app.use('/add-product', (req, res, next) => {
    res.send('<h1>In this section we can add product.</h1>');
});

app.use('/', (req, res, next) => {
    console.log('Another middleware;');
    res.send('<h1>Yo, buddy 111.</h1>');
});

app.listen(3000);