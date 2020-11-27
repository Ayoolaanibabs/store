const express = require('express');
const suggestController = require('../controllers/suggestController');
const router = express.Router();

const suggestedController = require('../controllers/suggestedController');

router.get('/', suggestedController.suggestedAll);
router.get('/:category', suggestedController.suggestedCategory)
module.exports = router;