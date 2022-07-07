// npm packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes/api');
const mongodbURI = 'mongodb+srv://giovannicelis:kissofmercury@merncluster.deb9c.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongodbURI || 'mongodb://localhost/mern_challenge', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('MONGOOSE IS ONLINE.')
});






app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HTTP request logger
app.use(morgan("tiny"));
app.use('/api', routes);
app.listen(PORT, console.log(`The server is starting at ${PORT}`));