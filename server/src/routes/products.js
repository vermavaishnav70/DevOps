const express = require('express');
const router = express.Router();

let products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 699 }
];

// Get all products
router.get('/', (req, res) => {
    res.json(products);
});

// Get product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

// Create new product
router.post('/', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Update product
router.put('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;

    res.json(product);
});

// Delete product
router.delete('/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).json({ message: 'Product not found' });

    const deletedProduct = products.splice(productIndex, 1);
    res.json(deletedProduct[0]);
});

module.exports = router;
