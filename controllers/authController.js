const { Router } = require('express');
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config');

const isGuest = require('../middlewares/isGuest');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = new Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', isGuest, async(req, res) => {
    const { username, password } = req.body;
    try {
        let token = await authService.login({ username, password });
        res.cookie(COOKIE_NAME, token);
        res.redirect('/products');
    } catch (error) {
        res.send(error);
    };
});

router.get('/register', isGuest, (req, res) => {
    res.render('register');
});

router.post('/register', isGuest, async(req, res) => {
    const { username, password, repeatPassword } = req.body;
    //check if the passwords match
    if (password !== repeatPassword) {
        res.render('register', { message: 'Password missmatch' });
        return;
    };

    try {
        let user = await authService.register({ username, password });
        res.redirect('/auth/login');
    } catch (err) {
        res.render('register', { err });
    };
});

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/products');
});


module.exports = router;