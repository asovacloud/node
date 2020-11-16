const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const { body } = require('express-validator');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  '/add-product',
  [
    body('title', 'The title should be a string with min 3 characters.')
        .isString()
        .isLength({min: 3})
        .trim(),
    body('imageUrl', 'Should be an URL.').isURL(),
    body('price', 'Should be a Float Number').isFloat(),
    body('description', 'Should be min 5 characters.')
        .isLength({min: 5, max: 400})
        .trim()
  ],
  isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post(
  '/edit-product',
  [
    body('title')
        .isString()
        .isLength({min: 3})
        .trim(),
    body('imageUrl').isURL(),
    body('price').isFloat(),
    body('description')
        .isLength({min: 5, max: 400})
        .trim()
  ],
  isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;