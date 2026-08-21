const jwt = require("jsonwebtoken");

// ADMIN MIDDLEWARE****
function adminMiddleware(req, res, next) {
    try {
        // Authorization header se token nikalein
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : req.cookies?.token; // fallback (agar kabhi cookie bhi ho to)

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Forbidden" });
        }

        req.user = decoded; // ye add karna acha practice hai, agar admin routes mein req.user chahiye ho

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