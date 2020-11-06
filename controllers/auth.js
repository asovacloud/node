const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req.get('Cookie').split('; ').find(item => item.includes('loggedIn')).split('=')[1] === 'true';
    console.log('Session: ', req.session.isLoggedIn);
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;

    User.findById('5fa1aead6df96a4bdd17f073')
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save(err => {
                console.log(err);
                res.redirect('/');
            })
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
}