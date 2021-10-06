const fs = require('fs/promises');
const path = require('path');
const productsDb = require('../config/products.json');

class Model {
    constructor() {

    }
    save() {
        productsDb.push(this);
        return fs.writeFile(
            path.join(__dirname + '../config/products.json'),
            JSON.stringify(productsDb),
        );
    };

    static getAll() {
        return productsDb
    };

    static getOne(id) {
        return productsDb.find((product) => product.id === id);
    };
};

module.exports = Model;