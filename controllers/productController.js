const { Router } = require('express');
const router = Router();

// 

router.get('/', (req, res) => {
    res.render('home', { title: 'Homepage' });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create cube' });
});

router.post('/create', (req, res) => {
    console.log('created');
    console.log(req.body); // tova koeto klienta e izpratil;

    res.send('created');
});

router.get('/details/:productId', (req, res) => {
    console.log(req.params.productId);
    res.render('details', { title: 'Product Details' })
});


module.exports = router;