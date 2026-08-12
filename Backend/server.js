require('dotenv').config();
const app = require('./src/app')
const connectDb = require('./src/config/db')
const dns = require('dns');

// Set DNS to use Google's public DNS servers for reliable resolution in both development and production
dns.setServers(['8.8.8.8', '8.8.4.4']);

const PORT = process.env.PORT || 3000;


connectDb()

app.listen(PORT, () => {
    console.log(`server is running is on port ${PORT}`)
})
