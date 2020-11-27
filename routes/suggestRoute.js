const express = require('express');
const router = express.Router();

const SuggestController = require('../controllers/suggestController');


router.post('/', SuggestController.suggest);

module.exports = router;
