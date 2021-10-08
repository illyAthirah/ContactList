var express = require('express');
var router = express.Router();
var ContactAddressController = require('../controllers/category')

//POST routes
router.post('/', ContactAddressController.addCategory);

//GET routes
router.get('/:category_id/contacts', ContactAddressController.getContactsByCategory);
router.get('/', ContactAddressController.getAllCategory);

//UPDATE routes
router.patch('/:category_id', ContactAddressController.updateCategory);

//DELETE routes
router.delete('/:category_id', ContactAddressController.deleteCategory);

module.exports = router;