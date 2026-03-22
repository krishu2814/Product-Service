const express = require('express');
const app = express();
const { PORT } = require('./config/serverConfig');
const connectDB = require('./config/database');
const v1routes = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use API routes
app.use('/api', v1routes);

const setUpAndStartServer = () => {

    // Connect to MongoDB
    connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

setUpAndStartServer();
