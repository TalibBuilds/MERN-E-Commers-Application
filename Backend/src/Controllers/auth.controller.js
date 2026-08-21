const userModel = require("../models/user.model");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// register controller**
async function registerUser(req, res) {
    console.log("login hit")
    try {
        const { userName, email, mobileNumber, password, role } = req.body;

        // Basic input validation******
        if (!userName || !mobileNumber || !password || !email) {
            return res.status(400).json({
                message: "Please fill all required fields (userName, mobileNumber, email, password)"
            });
        }

        if (password.length <= 6) {
            return res.status(400).json({
                message: "password should be minimus 6 caracters"
            })
        }

        // Check for existing user by mobile or email******
        const existingUser = await userModel.findOne({
            $or: [
                { mobileNumber: mobileNumber },
                { email: email }
            ]
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists. Please login."
            });
        }

        // Hash the password***
        const hashPassword = await bcrypt.hash(password, 10);

        // Create user******
        const user = await userModel.create({
            userName,
            mobileNumber,
            email,
            password: hashPassword,
            role: role || 'customer'
        });

        // Generate JWT token**********
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        // token save in cookie***//
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        // Respond with account creation********
        return res.status(201).json({
            message: "Account created successfully",
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                mobileNumber: user.mobileNumber,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: `Something went wrong: ${err.message || err.data?.message || ''}`
        });
    }
}

// login controller**
async function loginUser(req, res) {
    try {
        const { identifier, password } = req.body;
        if (!identifier || !password) {
            return res.status(400).json({
                message: "please fill required fields"
            })
        }
        const user = await userModel.findOne({
            $or: [
                { email: identifier.toLowerCase() },
                { mobileNumber: identifier }
            ]
        }).select("+password")

        if (!user) {
            return res.status(401).json({
                message: "user not found"
            })
        }

        const verifypassword = await bcrypt.compare(password, user.password)

        if (!verifypassword) {
            return res.status(403).json({
                message: "unauthorise"
            })
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET,
            { expiresIn: '30d' }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",  // ✅ fix
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "user logged in",
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                mobileNumber: user.mobileNumber,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            },
        })


    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: `Something went wrong: ${err.message || err.data?.message || ''}`
        });
    }
}

// getcurrent user controller**
async function getCurrentUser(req, res) {
    try {
        const user = await userModel.findById((req.user.id)).select("-password")

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        return res.status(200).json({
            message: "Current User Fetched",
            user
        });

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal Server Error mai dikkt hai"
        })
    }
}

// updateLocation controller**
async function updateLocation(req, res) {
    try {
        const { latitude, longitude, city, fullAddress } = req.body;

        if (!latitude || !longitude || !city || !fullAddress) {
            return res.status(400).json({
                message: "Please provide complete location details"
            });
        }

        const user = await userModel.findByIdAndUpdate(
            req.user.id,
            {
                location: {
                    latitude,
                    longitude,
                    city,
                    fullAddress
                }
            },
            {
                new: true
            }
        ).select("-password");

        return res.status(200).json({
            message: "Location updated successfully",
            user
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

// logout controller****
async function logoutUser(req, res) {
    try {
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",  // ✅ fix
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Logout failed" });
    }
}

module.exports = { registerUser, loginUser, getCurrentUser, updateLocation, logoutUser }