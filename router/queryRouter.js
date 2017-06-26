const express = require('express');
const queryController = require('../controller/query.server.controller');

const queryRouter = express.Router();

//Listening and routing after getting a get on the link
queryRouter.get('/queries', (req, res) => {
    return queryController.getAllQueries(req, res);
});

//Listening and routing after getting a post request
queryRouter.post('/queries/:queryString', (req, res) => {
    return queryController.searchGoogle(req, res); 
});

//Listening and routing after getting a get request
queryRouter.get('/queries/:queryString', (req, res) => {
    return queryController.searchGoogle(req, res);
});


module.exports = queryRouter;