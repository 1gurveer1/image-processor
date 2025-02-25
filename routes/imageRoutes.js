const express = require('express');
const { uploadCSV } = require('../controllers/imageController');
const router = express.Router();

router.post('/upload', uploadCSV);

module.exports = router;
