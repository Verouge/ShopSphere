const Seller = require('../models/Seller');  

const isAuthenticated = (req, res, next) => {
    if (req.session.loggedIn && req.session.seller_id) {
        Seller.findOne({
            where: {
                id: req.session.seller_id,
            },
        }).then(sellerData => {
            if (sellerData) {
                req.seller = sellerData.get({ plain: true });
                next();
            } else {
                res.redirect('/login');
            }
        }).catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
    } else {
        res.redirect('/login');
    }
};

module.exports = {
    isAuthenticated
};
