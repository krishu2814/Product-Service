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

const crypto = require('crypto');

const publishEvent = async (routingKey, data, options = {}) => {
    try {
        if (!channel) {
            console.warn(`Cannot publish ${routingKey}: RabbitMQ channel not initialized`);
            return;
        }

        const correlationId =
            options.correlationId ||
            data.correlationId ||
            `amqp_${crypto.randomUUID()}`;

        data.correlationId = correlationId;

        channel.publish(
            EXCHANGE_NAME,
            routingKey,
            Buffer.from(JSON.stringify(data)),
            {
                persistent: true,
                contentType: 'application/json',
                correlationId,
                headers: {
                    'x-correlation-id': correlationId,
                    ...(options.headers || {}),
                },
            }
        );

        console.log(`[${correlationId}] [Product-Service] Event published: ${routingKey}`);
    } catch (error) {
        console.error(`Failed to publish event ${routingKey}:`, error.message);
    }
};

module.exports = {
    connectRabbitMQ,
    getChannel,
    publishEvent,
};
