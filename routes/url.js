
const express = require('express') 
const controller = require('../controllers/url')
const app = express.Router();

app.post('/url',controller.generateshorturl);
app.get('/analytics/:shortId',controller.handlegetAnalytics) 
module.exports = app; 