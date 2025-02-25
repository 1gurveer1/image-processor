const express = require('express');
const { checkStatus } = require('../controllers/statusController');
const router = express.Router();

router.get('/:id', checkStatus);

module.exports = router;
