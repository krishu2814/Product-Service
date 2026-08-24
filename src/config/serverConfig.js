require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    RABBITMQ_URL: process.env.RABBITMQ_URL,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME
};
