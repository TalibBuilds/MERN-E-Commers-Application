const express = require('express');
const { getAllFoods, getFoodById } = require('../Controllers/Food.controller');

const foodRoute = express.Router();

foodRoute.get('/items', getAllFoods);
foodRoute.get('/items/:id', getFoodById);

module.exports = foodRoute 