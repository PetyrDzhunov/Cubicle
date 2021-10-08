const { Router } = require('express');
const accessoryService = require('../services/accessoryService');
const router = Router();

const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

router.get('/create', isAuthenticated, (req, res) => {
    res.render('createAccessory');
});

//TODO validation middleware or just validate incomming data
router.post('/create', isAuthenticated, async(req, res) => {
    try {
        let accessory = await accessoryService.create(req.body);
        res.redirect('/products');

    } catch (err) {
        res.status(500).end();
    };
});


module.exports = router;