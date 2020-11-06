module.exports = (req, res, next) => {
    if (!req.session.isLoddedIn) {
        return res.redirect('/login');
    }
    next();
};