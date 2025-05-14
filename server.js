require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Swagger configuration
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Products API',
            version: '1.0.0',
            description: 'API for managing products and categories',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 5000}`,
                description: 'Development server',
            },
            {
                url: 'https://fakestore-backend-wake.onrender.com/', // Replace with your actual production URL
                description: 'Production server',
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Import routes
const productRoutes = require('./routes/products');

// Use routes
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    console.log("Server started");
    res.send('Server started');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));