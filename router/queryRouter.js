const express = require('express');
const queryController = require('../controller/query.server.controller');

const queryRouter = express.Router();

queryRouter.get('/queries', (req, res) => {
    return queryController.getAllQueries(req, res);
});

queryRouter.post('/queries/:queryString', (req, res) => {
    return queryController.searchGoogle(req, res); 
});

queryRouter.get('/queries/:queryString', (req, res) => {
    return queryController.searchGoogle(req, res);
});


module.exports = queryRouter;