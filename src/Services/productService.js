const {Product } = require('../Models/Products');
exports.getProducts = async (name,price,quantity) => {
    if (name) {
        const products = await Product.find({name: {$regex: name, $options: 'i'}}) 
        if(products.length === 0) {
            throw new Error('No products found');
        }
        return products;
    }
    if (price) {
        const products = await Product.find()
        .where('price').equals(price) 
        if(products.length === 0) {
            throw new Error('No products found');
        }
        return products;
    }
    if (quantity) {
        const products = await Product.find()
        .where('quantity').equals(quantity) 
        if(products.length === 0) {
            throw new Error('No products found');
        }
        return products;
    } else {
        const products = await Product.find();
        if(products.length === 0) {
            throw new Error('No products found');
        }
        return products;
    }
}

exports.createProduct = async (name, price, quantity) => {
    const product = new Product({name, price, quantity});
    try {
        await product.save(); 
        return product;
    } catch (error) {
        return {'message':error.message};
    }
}

exports.updateProduct = async (id, name, price, quantity) => { 
    try {
    const product = await Product.findById(id); 
    if (name) {
        product.name = name;
    }
    if (price) {
        product.price = price;
    }
    if (quantity) {
        product.quantity = quantity;
    }
        await product.save();
        return product;
    }
    catch (error) {
        return {'message':error.message};
    }
};