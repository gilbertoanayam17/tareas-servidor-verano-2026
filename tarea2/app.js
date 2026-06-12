const express = require('express');
const path = require('path');

const routes = require('./routes');

function createApp() {
    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/styles', express.static(path.join(__dirname, 'styles')));
    app.use('/assets', express.static(path.join(__dirname, 'assets')));
    app.use(routes);

    return app;
}

module.exports = {
    createApp
};