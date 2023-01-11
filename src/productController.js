const express = require('express');
const router = express.Router();
const {getProducts} = require('./productService');

router.get('/', async (req, res) => {
    const {name, price, quantity} = req.query;
    try {
        const products = await getProducts(name, price, quantity);
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

module.exports = router;
