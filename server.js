const express = require('express');
const dotenv = require('dotenv');
const {mongoose} = require('mongoose');
const {Product} = require('./src/Products');
const items = require('./src/sampleItems');
const productRouter = require('./src/productController');
const app = express();
app.use(express.json());
// Load environment variables
dotenv.config();
const PORT = process.env.PORT;

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        // drop all documents in collection
        Product.collection.drop();
        Product.insertMany(items);
        console.log(PORT);
        app.listen(PORT) 
    } catch (error) {
       console.log(error); 
    }  
}   

app.use('/products', productRouter);
 
start();



