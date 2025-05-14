// scripts/populateData.js
require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const Product = require('../models/Product');

mongoose.connect(process.env.MONGODB_URI);

async function populateProducts() {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        await Product.insertMany(response.data);
        console.log('Products populated successfully');
    } catch (error) {
        console.error('Error populating products:', error.message);
    }
}

async function populateAll() {
    await mongoose.connection.dropDatabase();
    console.log('Database cleared');

    await populateProducts();

    mongoose.disconnect();
}

populateAll();