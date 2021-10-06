const { Router } = require('express');

const productService = require('../services/productService');

const { validateProduct } = require('../controllers/helpers/productHelpers');

const router = Router();

router.get('/', (req, res) => {
    let products = productService.getAll(req.query);
    res.render('home', { title: 'Homepage', products });
});



router.get('/create', (req, res) => {
    res.render('create', { title: 'Create cube' });
});

router.post('/create', validateProduct, (req, res) => {
    console.log('create product query');
    productService.create(req.body)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end());
});



router.get('/details/:productId', (req, res) => {
    let product = productService.getOne(req.params.productId);
    res.render('details', { title: 'Product Details', product })
});



module.exports = router;