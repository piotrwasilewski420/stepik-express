const express = require('express');
const dotenv = require('dotenv');
const {mongoose} = require('mongoose');
const {Product} = require('./src/Models/Products');
const items = require('./src/Data/sampleItems');
const productRouter = require('./src/Controllers/productController');
const reportController = require('./src/Controllers/reportController');
const app = express();
app.use(express.json());
// Load environment variables
dotenv.config();
const PORT = process.env.PORT;

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        // drop all documents in collection
        await Product.collection.drop();
        await Product.insertMany(items);
        console.log(PORT);
        app.listen(PORT) 
    } catch (error) {
       console.log(error); 
    }  
}   

app.use('/products', productRouter);
app.use('/report',reportController)
 
start();



