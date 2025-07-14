const express = require('express');
const router = express.Router();
const { shortenUrl, getStats, redirectToLongUrl } = require('../controllers/shorturl.controller');

router.post('/', shortenUrl);
router.get('/:shortcode', getStats);
router.get('/r/:shortcode', redirectToLongUrl); 

module.exports = router;
