// const express = require('express');
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

import productRoute from './routes/product';
import categoryRoute from './routes/category';
import authRoute from './routes/auth';



const app = express();
const swaggerJSDocs = YAML.load('./api.yaml');

// middleware
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs))

// routes
app.use("/api", productRoute);
app.use("/api", categoryRoute);
app.use("/api", authRoute);

// connection db
mongoose.connect("mongodb://localhost:27017/we16310")
    .then(() => console.log("Ket noi DB thanh cong"))
    .catch(error => console.log(error))
// connect
const PORT = 8000;
app.listen(PORT, () => {
    console.log("Server của bạn đang chạy cổng ", PORT);
});