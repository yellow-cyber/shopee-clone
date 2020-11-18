﻿//DITO NIYO ILALAGAY YUNG PINAKA LOGIC TALAGA WALANG ROUTING MGA FUNCTION LANG 


const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const Product = db.Product;

module.exports = {
    getAllProducts,
    getAProduct,
    getAllMyProducts,
    getAllMyProducts,
    getById,
    createProduct,
    putProduct,
    deleteAProduct
};


async function getAllProducts() {
    return await Product.find();
}

async function getAProduct(id) {
    return await Product.findById(id);
}

async function getAllMyProducts(userid) {
    return await Product.find(userid);
}


async function getById(id) {
    return await Product.findById(id);
}

async function createProduct(productParam) {
    // validate
    if (await Product.findOne({ productName: productParam.productName })) {
        throw 'Product Name:  "' + productParam.productName + '" is already taken';
    }

    const product = new Product(productParam);

    // save product
    await product.save();
}

async function putProduct(id, productparams) {
    console.log(id)
    const product = await Product.findById(id);

    // validate
    if (!product) throw 'User not found';
    if (product.productName !== productparams.productName && await Product.findOne({ productName: productparams.productName })) {
        throw 'Product Name: "' + productparams.productName + '" is already taken';
    }

    // copy productparams properties to product
    Object.assign(product, productparams);
    await product.save();
}

async function deleteAProduct(id) {
    await Product.findByIdAndRemove(id);
} 