//DITO NIYO ILALAGAY YUNG PINAKA LOGIC TALAGA WALANG ROUTING MGA FUNCTION LANG 


const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Purchase = db.Purchase;
const Cart = db.Cart;

module.exports = {
    getAllpurchase,
    getAllCart,
    addToCart,
    checkoutCart,
    updateCart,
    addToCart,
    deleteAProductFormCart,
    deleteCart
};

async function getAllpurchase(userid) {
    return await Purchase.find(userid);
}

async function getAllCart(userid) {
    return await Cart.find({userid: userid}).exec();
}

async function addToCart(cart) {
    const newcCart = new Cart({
        userid : cart.userid,
        itemid : cart.itemid,
        quantity : cart.quantity,
        price : cart.price
    });
    // save cart
    await newcCart.save();
}

async function checkoutCart(userid) {
    //get all data by userid
    const checkoutarray = await Cart.find({userid: userid}).exec()
    //run through all the data
    for (var i = 0; i < checkoutarray.length; i++) {
        let arrayholder = {
            userid: checkoutarray[i].userid,
            itemid: checkoutarray[i].itemid,
            quantity: checkoutarray[i].itemid,
            price: checkoutarray[i].price
        }
        const checkoutCartHold = new Purchase(arrayholder);
        await Cart.findByIdAndRemove(checkoutarray[i].id);
        await checkoutCartHold.save();
    }
    return
}

async function updateCart(cartParams, Cartid) {
    const cart = await Cart.findById(Cartid);
    // copy cartParams properties to cart
    Object.assign(cart, cartParams);

    await cart.save();
}

async function deleteAProductFormCart(id) {
    await Cart.findByIdAndRemove(id);
}

async function deleteCart(id) {
    const deleteCartArray = await Cart.find({userid: id}).exec()
    for (var i = 0; i < deleteCartArray.length; i++) {
        await Cart.findByIdAndRemove(deleteCartArray[i].id);    
    }
}

async function getAllpurchase(userid) {
    return await Product.find(userid);
}