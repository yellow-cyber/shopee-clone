﻿//DITO NIYO ILALAGAY YUNG MGA ROUTES TAPOS YUNG MGA FUNCTION NA GAGAMITIN NYA SA SERVICE
const express = require("express");
const router = express.Router();
const productService = require("./products.service");

// routes

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.put("/:id", putProduct);
router.delete("/:id", deleteProduct);
router.post("/create", createProduct);
//router.post('/:id/purchas?e', buyProduct);

// router.get('/auth/purchase', getAllpurchasedByUser);
// router.get('auth/cart', getAllInCart);
// router.post('/auth/checkout', checkoutCart);
// router.put('/auth/product/:id', putCart);
// router.delete('/auth/cart/product/:id', deleteProductfromcart);
// router.delete('/auth/cart/cart/product', deleteCart);

module.exports = router;

function getAllProducts(req, res, next) {
  productService
    .getAllProducts()
    .then((products) => res.json(products))
    .catch((err) => next(err));
}

function getProduct(req, res, next) {
  productService
    .getProduct(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => next(err));
}

function putProduct(req, res, next) {
  productService
    .putProduct(req.params.id, req.body)
    .then(() => res.json({ update: "true" }))
    .catch((err) => next(err));
}

function createProduct(req, res, next) {
  productService
    .createProduct(req.body)
    .then(() =>
      res.json({
        created: "true",
      })
    )
    .catch((err) => next(err));
}

function deleteProduct(req, res, next) {
  productService
    .deleteProduct(req.params.id)
    .then(() =>
      res.json({
        delete: "true",
      })
    )
    .catch((err) => next(err));
}
