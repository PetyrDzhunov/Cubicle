const Accessory = require('../models/Accessory');

function createAccessory(data) {
    let accessory = new Accessory(data);
    return accessory.save();
};

function getAll() {
    return Accessory.find().lean();
};


module.exports = {
    create: createAccessory,
    getAll
}