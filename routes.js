const { Router } = require('express');
const productController = require('./controllers/productController');
const homeController = require('./controllers/homeController');
const router = Router();
router.use('/', homeController);
router.use('/products', productController);


// if none of those routers cant handle this path =>
// we dont have a controller for it => it does not exist
// =>  we cant resolve it , so for any else endpoint,
// => render 404.
router.get('*', (req, res) => {
    res.render('404');
});
//iskam na vsichki zaqvki koito idvat na /product ,
// da gi naznachish na nashiq product contoller


module.exports = router;