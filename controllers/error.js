exports.get404 = (req, res, next) => {
    res.status(404).render('not-found', { pageTitle: 'Not Found Page', path: '', isAuthenticated: req.session.isLoggedIn });
};