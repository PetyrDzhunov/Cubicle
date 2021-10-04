const Cube = require('../models/Cube');
const uniqid = require('uniqid');
const fs = require('fs/promises');
const path = require('path');
let productsData = require('../config/products.json');

function getAll(query) {
    let result = productsData;

    if (query.search) {
        result = result.filter((product) => product.name.toLowerCase().includes(query.search))
    };
    if (query.from) {
        result = result.filter((product) => Number(product.level) >= query.from)
    }

    if (query.to) {
        result = result.filter((product) => Number(product.level) <= query.to);
    };
    return result;
};

function createProduct(data) {
    let cube = new Cube(uniqid(), data.name, data.description, data.imageUrl, data.difficultyLevel);
    productsData.push(cube);
    // fs.writeFile(
    //     path.join(__dirname + '../config/products.json'),
    //     JSON.stringify(productsData),
    //     callback);

    return fs.writeFile(path.join(__dirname + '../config/products.json'),
        JSON.stringify(productsData), )
};

function getOne(id) {
    return productsData.find((product) => product.id === id);
};

module.exports = {
    create: createProduct,
    getAll,
    getOne
}