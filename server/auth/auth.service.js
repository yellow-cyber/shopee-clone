//DITO NIYO ILALAGAY YUNG PINAKA LOGIC TALAGA WALANG ROUTING MGA FUNCTION LANG

const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const Purchase = db.Purchase;
const Cart = db.Cart;
const Product = db.Product;

module.exports = {
  getAllpurchase,
  getAllCart,
  addToCart,
  checkoutCart,
  updateCart,
  addToCart,
  deleteAProductFormCart,
  deleteCart,
  getallMyproducts,
  getMyproductsById,
  getAllMysoldProducts,
};

async function getAllpurchase(userid) {
  return await Purchase.find({ userid: userid }).exec();
}

async function getAllCart(userid) {
  return await Cart.find({ userid: userid }).exec();
}

async function addToCart(cart, userid) {
  const newcCart = new Cart({
    userid: userid,
    itemid: cart.itemid,
    quantity: cart.quantity,
    price: cart.price,
    totalPrice: cart.price * cart.quantity,
    isChecked: false,
  });
  // save cart
  await newcCart.save();
}

async function checkoutCart(userid) {
  //get all data by userid
  const checkoutarray = await Cart.find({ userid, isChecked: true }).exec();
  //run through all the data
  for (var i = 0; i < checkoutarray.length; i++) {
    let arrayholder = {
      userid: checkoutarray[i].userid,
      itemid: checkoutarray[i].itemid,
      quantity: checkoutarray[i].quantity,
      price: checkoutarray[i].price,
    };
    const checkoutCartHold = new Purchase(arrayholder);
    await Cart.findByIdAndRemove(checkoutarray[i].id);
    await checkoutCartHold.save();
  }
  return;
}

async function updateCart(cartParams, Cartid) {
  const cart = await Cart.findById(Cartid);
  // copy cartParams properties to cart
  Object.assign(cart, cartParams);

  return await cart.save();
}

async function deleteAProductFormCart(id) {
  await Cart.findByIdAndRemove(id);
}

async function deleteCart(id) {
  const deleteCartArray = await Cart.find({ userid: id }).exec();
  for (var i = 0; i < deleteCartArray.length; i++) {
    await Cart.findByIdAndRemove(deleteCartArray[i].id);
  }
}

async function getallMyproducts(userid) {
  return await Product.find({ ownerId: userid }).exec();
}

async function getMyproductsById(userid, productId) {
  return await Product.find({ ownerId: userid, productId: productId }).exec();
}

async function getAllMysoldProducts(userid) {
  return await Product.find({ ownerId: userid, sold: { $gte: 1 } }).exec();
}
