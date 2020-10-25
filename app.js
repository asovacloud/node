const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.engine('.hbs', exphbs({
    extname: '.hbs',
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout'
}));
app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('not-found', { pageTitle: 'Not Found Page' });
});

app.listen(3000);