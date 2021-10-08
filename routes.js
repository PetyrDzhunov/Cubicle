const { Router } = require('express');
const productController = require('./controllers/productController');
const homeController = require('./controllers/homeController');
const accessoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authController');

const isAuthenticated = require('./middlewares/isAuthenticated');
const isGuest = require('./middlewares/isGuest');

const router = Router();
router.use('/', homeController);
router.use('/auth', authController);
//isGuest kazva na nivo controller => koi na kade moje da hodi.
//vseki edin koito otiva v authControllera da e isGuest
// toest lognat potrebitel nqma da moje da otida na auth routes;    
router.use('/products', productController);
router.use('/accessories', accessoryController);

router.get('*', (req, res) => {
    res.render('404');
});
//iskam na vsichki zaqvki koito idvat na /product ,
// da gi naznachish na nashiq product contoller


module.exports = router;