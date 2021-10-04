const { Router } = require('express');
const productController = require('./controllers/productController');
const aboutController = require('./controllers/aboutController');
const router = Router();
router.use('/', productController);
router.use('/about', aboutController)
    //iskam na vsichki zaqvki koito idvat na /product ,
    // da gi naznachish na nashiq product contoller


module.exports = router;