const jwt = require("jsonwebtoken");

// ADMIN MIDDLEWARE****
function adminMiddleware(req, res, next) {

    try {

        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Forbidden" });
        }

        console.log("Admin middleware passed");

        next();
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

module.exports = { adminMiddleware }