const jwt = require('jsonwebtoken');
const { COOKIE_NAME, SECRET } = require('../config');

module.exports = function() {
    return (req, res, next) => {
        let token = req.cookies[COOKIE_NAME];

        if (token) {
            //if our user has logged in we want to attach to the request user
            // TODO : verify token  
            jwt.verify(token, SECRET, function(err, decoded) {
                if (err) {
                    res.clearCookie(COOKIE_NAME);
                } else {
                    // what we want when we get our token verified?
                    req.user = decoded;
                    res.locals.isAuthenticated = true;
                }
            });

        };
        next();
    };
};