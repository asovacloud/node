const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    res.render(
        'admin/edit-product', {
            pageTitle: 'Add Product Page',
            path: '/add-product',
            editing: false
        });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product({
        title,
        price,
        description,
        imageUrl,
        userId: req.user
    });
    product
        .save()
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;

    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render(
                'admin/edit-product', {
                    pageTitle: 'Edit Product Page',
                    path: '/edit-product',
                    editing: editMode,
                    product
                });
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;

    Product.findById(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imageUrl = updatedUrl;
            product.description = updatedDescription;
            return product.save()
        })
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    Product.find()
        .then(prods => {
            res.render(
                'admin/products', {
                    prods,
                    pageTitle: 'Admin Products',
                    path: '/admin/products'
                }
            );
        })
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndDelete(prodId)
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};