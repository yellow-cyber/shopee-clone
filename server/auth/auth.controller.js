//DITO NIYO ILALAGAY YUNG MGA ROUTES TAPOS YUNG MGA FUNCTION NA GAGAMITIN NYA SA SERVICE
const express = require("express");
const router = express.Router();
const authService = require("./auth.service");

// routes
router.get("/purchase", getAllpurchase);
router.get("/cart", getAllCart);
router.post("/cart/add", addToCart);
router.post("/checkout", checkoutCart);

router.put("/cart/:id", updateCart);
router.delete("/cart/:id", deleteAProductFormCart);
router.delete("/cart/", deleteCart);

router.get("/my-products", getallMyproducts);
router.get("/my-products/:id", getMyproductsById);
router.get("/sold-products", getAllMysoldProducts);

module.exports = router;

function getAllpurchase(req, res, next) {
  authService
    .getAllpurchase(req.user.sub)
    .then((purchase) => res.json(purchase))
    .catch((err) => next(err));
}

function getAllCart(req, res, next) {
  authService
    .getAllCart(req.user.sub)
    .then((purchase) => res.json(purchase))
    .catch((err) => next(err));
}

function addToCart(req, res, next) {
  authService
    .addToCart(req.body, req.user.sub)
    .then(() => res.json({ addToCart: "true" }))
    .catch((err) => next(err));
}

function checkoutCart(req, res, next) {
  authService
    .checkoutCart(req.user.sub)
    .then(() => res.json({ checkout: "true" }))
    .catch((err) => next(err));
}

function updateCart(req, res, next) {
  console.log(req.body);
  console.log(req.params.id);
  authService
    .updateCart(req.body, req.params.id)
    .then((cart) => res.json({ updateCart: cart }))
    .catch((err) => next(err));
}

function deleteAProductFormCart(req, res, next) {
  authService
    .deleteAProductFormCart(req.params.id)
    .then(() => res.json({ delete: "true" }))
    .catch((err) => next(err));
}

function deleteCart(req, res, next) {
  authService
    .deleteCart(req.body.userid)
    .then(() => res.json({ "delete cart": "true" }))
    .catch((err) => next(err));
}

function getallMyproducts(req, res, next) {
  authService
    .getallMyproducts(req.user.sub)
    .then((myproduct) => res.json(myproduct))
    .catch((err) => next(err));
}

function getMyproductsById(req, res, next) {
  authService
    .getMyproductsById(req.body.userid, req.params.id)
    .then((myproduct) => res.json(myproduct))
    .catch((err) => next(err));
}

function getAllMysoldProducts(req, res, next) {
  authService
    .getAllMysoldProducts(req.body.userid)
    .then((myproduct) => res.json(myproduct))
    .catch((err) => next(err));
}
