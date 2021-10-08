var express = require('express');
var router = express.Router();
var ContactAddressController = require('../controllers/contact')


//Post routes
router.post('/', ContactAddressController.postContact);
router.post('/:id/phone', ContactAddressController.addPhone);
router.post('/:id/address', ContactAddressController.addAddress);



//GET routes
router.get('/', ContactAddressController.getAllContacts);
router.get('/:id', ContactAddressController.getContacts);
router.get('/favourite', ContactAddressController.getFavContacts);

//PATCH routes
router.patch('/:id', ContactAddressController.updateContact);
router.patch('/:id/phone', ContactAddressController.updatePhone);
router.patch('/:id/address', ContactAddressController.updateAddress);

//DELETE routes
router.delete('/:id', ContactAddressController.deleteContacts);
router.delete('/:id/phone', ContactAddressController.deletePhone);
router.delete('/:id/address', ContactAddressController.deleteAddress);

module.exports = router;