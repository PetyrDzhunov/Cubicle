const { Router } = require('express');
const productController = require('./controllers/productController');
const homeController = require('./controllers/homeController');
const accessoryController = require('./controllers/accessoryController');
const router = Router();
router.use('/', homeController);
router.use('/products', productController);
router.use('/accessories', accessoryController);

router.get('*', (req, res) => {
    res.render('404');
});
//iskam na vsichki zaqvki koito idvat na /product ,
// da gi naznachish na nashiq product contoller


module.exports = router;