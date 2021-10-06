const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

async function getAll(query) {
    let products = await Cube.find({}).lean();
    if (query.search) {
        products = products.filter((product) => product.name.toLowerCase().includes(query.search))
    };
    if (query.from) {
        products = products.filter((product) => Number(product.level) >= query.from)
    }

    if (query.to) {
        products = products.filter((product) => Number(product.level) <= query.to);
    };
    return products;
};

function createProduct(data) {
    let cube = new Cube(data);
    return cube.save();
};

function getOne(id) {
    return Cube.findById(id).lean();
    // returns a promise
};

async function attachAccessory(productId, accessoryId) {
    let product = await Cube.findById(productId);
    let accessory = await Accessory.findById(accessoryId);
    product.accessories.push(accessory);
    return product.save();
};

module.exports = {
    create: createProduct,
    getAll,
    getOne,
    attachAccessory
}