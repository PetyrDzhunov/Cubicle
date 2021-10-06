const Cube = require('../models/Cube');
const uniqid = require('uniqid');
const productData = require('../data/productData');

function getAll(query) {
    let products = Cube.getAll();
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
    let cube = new Cube(uniqid(), data.name, data.description, data.imageUrl, data.difficultyLevel);
    return cube.save();
};

function getOne(id) {
    return Cube.getOne(id);
};

module.exports = {
    create: createProduct,
    getAll,
    getOne
}