const auth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/sellers/login');
        return;
    }
    next();
};

module.exports = auth;
