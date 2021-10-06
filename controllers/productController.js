const { Router } = require('express');

const productService = require('../services/productService');

const { validateProduct } = require('../controllers/helpers/productHelpers');

const router = Router();

router.get('/', (req, res) => {
    productService.getAll(req.query)
        .then(products => {
            res.render('home', { title: 'Homepage', products });
        })
        .catch(() => res.status(500).end());
});



router.get('/create', (req, res) => {
    res.render('create', { title: 'Create cube' });
});

router.post('/create', validateProduct, (req, res) => {
    productService.create(req.body)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end());
});



router.get('/details/:productId', async(req, res) => {
    let product = await productService.getOne(req.params.productId);
    console.log(product);
    res.render('details', { title: 'Product Details', product });
    // .then((productData) => {
    //     res.render('details', { title: 'Product Details', productData })
    // })
    // .catch(err => res.render('404'));
});



module.exports = router;