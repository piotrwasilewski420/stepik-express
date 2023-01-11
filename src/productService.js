const {Product } = require('./Products');
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