const { Router } = require('express');
const validator = require('validator');

const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

const { validateProduct } = require('../controllers/helpers/productHelpers');

const router = Router();

router.get('/', (req, res) => {
    productService.getAll(req.query)
        .then(products => {
            res.render('home', { title: 'Homepage', products });
        })
        .catch(() => res.status(500).end());
});



router.get('/create', isAuthenticated, (req, res) => {
    res.render('create', { title: 'Create cube' });
});

router.post('/create', isAuthenticated, (req, res) => {
    productService.create(req.body, req.user._id)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end());
});



router.get('/details/:productId', async(req, res) => {
    let product = await productService.getOneWithAccessories(req.params.productId);
    res.render('details', { title: 'Product Details', product });

});

router.get('/:productId/attach', isAuthenticated, async(req, res) => {
    let product = await productService.getOne(req.params.productId);
    let accessories = await accessoryService.getAllUnattached(product.accessories);
    res.render('attachAccessory', { product, accessories });
});

router.post('/:productId/attach', isAuthenticated, (req, res) => {
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(response => {
            res.redirect(`/products/details/${req.params.productId}`)
        });
});

router.get('/:productId/edit', isAuthenticated, (req, res) => {
    //go to DB take the cube and give it to the response!
    productService.getOne(req.params.productId)
        .then((product) => {
            res.render('editCube', product);
        });
});

router.post('/:productId/edit', isAuthenticated, validateProduct, (req, res) => {
    productService.updateOne(req.params.productId, req.body)
        .then((response) => {
            res.redirect(`/products/details/${req.params.productId}`);
        })
        .catch(error => console.log(error));

});

router.get('/:productId/delete', isAuthenticated, (req, res) => {
    productService.getOne(req.params.productId)
        .then((product) => {
            if (req.user._id != product.creator) {
                res.redirect('/products');
            } else {
                res.render('deleteCube', product);
            }
        });
});

router.post('/:productId/delete', isAuthenticated, (req, res) => {
    productService.deleteOne(req.params.productId)
        .then((response) => {
            if (req.user._id != product.creator) {
                res.redirect('/products');
            } else {
                res.render('deleteCube', product);
            }
        });
});



module.exports = router;