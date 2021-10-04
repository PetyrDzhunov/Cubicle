const { Router } = require('express');
const productController = require('./controllers/productController');
const aboutController = require('./controllers/aboutController');
const router = Router();
router.use('/', productController);
router.use('/about', aboutController)


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