const uploadFood = require('../models/uploadFood.model')
const uploadFile = require('../services/storage.service')

async function uploadFoodImage(req, res) {
    try {
        const file = req.file;

        const { foodName, foodDescription, foodPrice, category, isAvailable } = req.body;

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        if (!foodName || !foodDescription || !foodPrice || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // imagekit uploadFile function*****
        const imageUrl = await uploadFile(file);

        // model file function***** for save image in database*****
        const newFood = new uploadFood({
            foodName,
            description: foodDescription,
            price: foodPrice,
            foodImage: imageUrl.url,
            category,
            isAvailable: isAvailable !== undefined ? isAvailable : true,
        });

        await newFood.save();

        return res.status(201).json({
            message: "Food item uploaded successfully",
            food: newFood,
        });

    } catch (err) {
        console.log("Controller Error:", err);
        return res.status(500).json({
            message: "Server Error",
            error: err.message
        });
    }
}

module.exports = { uploadFoodImage }