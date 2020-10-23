const express = require('express');

const app = express();

console.log('********');

app.get('/users', (req, res, next) => {
    res.send(`
      <ul>
        <li>Lili</li>
        <li>Nessa</li>
        <li>Lidmila</li>
      </ul>
    `);
    console.log(`USERS's console`);
    next();
});

app.get('/', (req, res, next) => {
    console.log(`MAIN's console`);
    res.send('<h1>This is a main page!</h1>');
});

app.listen(3000);