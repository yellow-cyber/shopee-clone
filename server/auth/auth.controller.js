//DITO NIYO ILALAGAY YUNG MGA ROUTES TAPOS YUNG MGA FUNCTION NA GAGAMITIN NYA SA SERVICE
const express = require('express');
const router = express.Router();
const authService = require('./auth.service');

// routes
router.get('/purchase', getAllpurchase);
router.get('/cart', getAllCart);
router.get('/cart/add', addToCart);
router.post('/checkout', checkoutCart);//ping

router.put('/cart/product/:id', updateCart);
router.delete('/cart/product/:id', deleteAProductFormCart);
router.delete('/cart/product/', deleteCart);

// router.get('/auth/my-products', authenticate);
// router.get('/auth/auth/my-products/:id', authenticate);
// router.get('/auth/auth/sold-products', authenticate);


module.exports = router;

function getAllpurchase(req, res, next) {
    authService.getAllpurchase(userid)
        .then(purchase => res.json(purchase))
        .catch(err => next(err));
}

function getAllCart(req, res, next) {
    authService.getAllCart(req.body.userid)
        .then(purchase => res.json(purchase))
        .catch(err => next(err));
}

function addToCart(req, res, next) {
    authService.addToCart(req.body)
        .then( ()=> res.json({'addToCart':'true'}))
        .catch(err => next(err));
}

function checkoutCart(req, res, next) {
    authService.checkoutCart(req.body.userid)
        .then(() => res.json({'checkout':'true'}))
        .catch(err => next(err));
}

function updateCart(req, res, next) {
    console.log(req.body)
    console.log(req.params.id)
    authService.updateCart( req.body, req.params.id)
        .then(() => res.json({'updateCart':'true'}))
        .catch(err => next(err));
}

function deleteAProductFormCart(req, res, next) {
    authService.deleteAProductFormCart(req.params.id)
        .then(() => res.json({'delete':'true'}))
        .catch(err => next(err));
}

function deleteCart(req, res, next) {
    authService.deleteCart(req.body.userid)
        .then(() => res.json({'delete cart':'true'}))
        .catch(err => next(err));
}
