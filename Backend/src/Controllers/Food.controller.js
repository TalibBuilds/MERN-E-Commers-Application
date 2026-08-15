// http://localhost:5000/api/food/items
// http://localhost:3000/api/food/items?category=momo
// http://localhost:3000/api/food/items?search=momo
// http://localhost:3000/api/food/items?category=momo&search=chicken



const Food = require('../models/uploadFood.model');

async function getAllFoods(req, res) {
    try {
        const {
            category,
            search,
            isAvailable,
            minPrice,
            maxPrice,
            sort,
            page = 1,
            limit = 10,
        } = req.query;

        const filter = {};

        if (category) {
            filter.category = { $regex: category, $options: 'i' };
        }

        if (isAvailable !== undefined) {
            filter.isAvailable = isAvailable === 'true';
        }

        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.price = {};

            if (minPrice !== undefined) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice !== undefined) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        if (search) {
            filter.$or = [
                { foodName: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
            ];
        }

        let sortOptions = { createdAt: -1 };

        if (sort) {
            const [field, direction] = sort.split('-');
            const order = direction === 'asc' ? 1 : -1;
            sortOptions = { [field]: order };
        }

        const parsedPage = Math.max(1, Number(page));
        const parsedLimit = Math.max(1, Number(limit));
        const skip = (parsedPage - 1) * parsedLimit;

        const [foods, totalFoods] = await Promise.all([
            Food.find(filter)
                .sort(sortOptions)
                .skip(skip)
                .limit(parsedLimit),
            Food.countDocuments(filter),
        ]);

        return res.status(200).json({
            message: 'Food items fetched successfully',
            page: parsedPage,
            limit: parsedLimit,
            totalFoods,
            totalPages: Math.ceil(totalFoods / parsedLimit) || 1,
            foods,
        });
    } catch (error) {
        console.error('GetAllFoods error:', error);
        return res.status(500).json({
            message: 'Server error while fetching food items',
            error: error.message,
        });
    }
}

async function getFoodById(req, res) {
    try {
        const { id } = req.params;

        const food = await Food.findById(id);

        if (!food) {
            return res.status(404).json({
                message: 'Food item not found',
            });
        }

        return res.status(200).json({
            message: 'Food item fetched successfully',
            food,
        });
    } catch (error) {
        console.error('GetFoodById error:', error);
        return res.status(500).json({
            message: 'Server error while fetching food item',
            error: error.message,
        });
    }
}

module.exports = {
    getAllFoods,
    getFoodById,
};