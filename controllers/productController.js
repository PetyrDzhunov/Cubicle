const { Router } = require('express');
const router = Router();

// 

router.get('/', (req, res) => {
    res.render('home', { title: 'Homepage' });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create cube' });
})
module.exports = router;