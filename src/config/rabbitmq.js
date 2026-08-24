const amqp = require('amqplib');
const { RABBITMQ_URL, EXCHANGE_NAME } = require('./serverConfig');

let connection;
let channel;

const connectRabbitMQ = async () => {
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, 'topic', {
            durable: true,
        });
        console.log('Product-Service RabbitMQ Connected');
    } catch (error) {
        console.error('Product-Service RabbitMQ connection failed:', error.message);
        // Non-blocking in local dev if RabbitMQ is not running
    }
};

const getChannel = () => {
    return channel;
};

const publishEvent = async (routingKey, data) => {
    try {
        if (!channel) {
            console.warn(`Cannot publish ${routingKey}: RabbitMQ channel not initialized`);
            return;
        }

        channel.publish(
            EXCHANGE_NAME,
            routingKey,
            Buffer.from(JSON.stringify(data)),
            {
                persistent: true,
                contentType: 'application/json',
            }
        );

        console.log(`Event published: ${routingKey}`);
    } catch (error) {
        console.error(`Failed to publish event ${routingKey}:`, error.message);
    }
};

module.exports = {
    connectRabbitMQ,
    getChannel,
    publishEvent,
};
