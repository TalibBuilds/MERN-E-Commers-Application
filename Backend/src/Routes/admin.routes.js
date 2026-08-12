const express = require('express');
const multer = require('multer');

const adminRoutes = express.Router();

// Middleware for handling file uploads
const adminMiddleware = require('../middlewares/adminMiddleware');
// ***controller***
const { uploadFoodImage } = require('../Controllers/admin.controller');

const upload = multer({
    storage: multer.memoryStorage(),
})


// prefix*** /api/admin***
adminRoutes.post('/upload-food-image', adminMiddleware.adminMiddleware, upload.single("foodImage"), uploadFoodImage);


module.exports = adminRoutes;