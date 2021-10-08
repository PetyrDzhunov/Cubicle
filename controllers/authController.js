const { Router } = require('express');
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config');

const router = new Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async(req, res) => {
    //take form data
    const { username, password } = req.body;
    try {
        let token = await authService.login({ username, password });
        res.cookie(COOKIE_NAME, token);
        res.redirect('/products');
    } catch (error) {
        console.log(error);
        // res.render('login', { error });
        res.send(error);
    };
    //validate
    //login
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async(req, res) => {
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


module.exports = router;