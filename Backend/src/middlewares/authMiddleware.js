const jwt = require("jsonwebtoken");

// TOKEN VERIFY MIDDLEWARE****
function authMiddleware(req, res, next) {
    try {
        // Authorization header se token nikalein (Bearer token format)
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : req.cookies?.token; // fallback, agar kabhi cookie se bhi aaye

        if (!token) {
            return res.status(401).json({
                message: "Token is missing"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid or Expired Token"
        });
    }
}

module.exports = { authMiddleware };