const express = require('express')
const app = express()
const cors = require('cors')
const cookieparser = require('cookie-parser')


// CORS POLICY****************
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like Postman, curl, mobile apps)
        if (!origin) return callback(null, true);

        // allow localhost and any local network IP on port 5173
        if (origin.match(/^http:\/\/localhost:5173$/) || origin.match(/^http:\/\/192\.168\.\d+\.\d+:5173$/)) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

app.use(express.json())
app.use(cookieparser())


// Import authentication routes
const authRoutes = require('./Routes/auth.routes');
// *****ADMIN ACESS ROUES*******
const adminRoutes = require('./Routes/admin.routes');
// food fetching api routes****//
const foodRoute = require('./Routes/food.routes')


// Register authentication routes under /api/auth
app.use('/api/auth', authRoutes);

// admim****routes
app.use('/api/admin', adminRoutes);

//  food fetching api ***
app.use('/api/food', foodRoute)

module.exports = app;