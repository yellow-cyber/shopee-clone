
const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Product = db.Product;

module.exports = {
    getAll,
    getById,
    delete: _delete
};

async function getAll() {
    return await Product.find();
}

async function getById(id) {
    return await this.findById(id);
}
async function _delete(id) {
    await Product.findByIdAndRemove(id);
}