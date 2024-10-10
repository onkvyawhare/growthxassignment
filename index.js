const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/connectdb');
const userRoutes = require('./routes/Userroutes');
const adminRoutes = require('./routes/Adminroutes');

dotenv.config();

const app = express();
connectDB();

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/admins', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
