const { Router } = require('express');

const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');

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

router.get('/:productId/attach', async(req, res) => {
    let product = await productService.getOne(req.params.productId);
    let accessories = await accessoryService.getAll();
    res.render('attachAccessory', { product, accessories });
})

router.post('/:productId/attach', (req, res) => {
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(response => {
            res.redirect(`/products/details/${req.params.productId}`)
        })
});


module.exports = router;