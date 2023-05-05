const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    DB_URI : process.env.DB_URI,
    JWT_SECRET_KEY : process.env.JWT_SECRET_KEY
}