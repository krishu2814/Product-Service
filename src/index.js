const express = require('express');
const app = express();
const { PORT } = require('./config/serverConfig');
const connectDB = require('./config/database');
const { connectRabbitMQ } = require('./config/rabbitmq');
const v1routes = require('./routes/index');
const attachUser = require('./utils/User-Role');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(attachUser);

// Use API routes
app.use('/api', v1routes);

const setUpAndStartServer = async () => {
    // Connect to MongoDB
    await connectDB();

    // Connect to RabbitMQ
    await connectRabbitMQ();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

setUpAndStartServer();
