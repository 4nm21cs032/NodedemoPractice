const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/', urlController.createShortUrl); 
router.get('/:id', urlController.getUrlDetails); 
router.get('/', urlController.getAllUrls); 
router.put('/:id', urlController.updateUrl);   
router.delete('/:id', urlController.deleteUrl);

module.exports = router;