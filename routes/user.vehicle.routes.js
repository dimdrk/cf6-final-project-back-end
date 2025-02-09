const express = require('express');
const router = express.Router();

const userVehicleController = require('../controllers/user.vehicle.controller');

router.get('/:username', userVehicleController.findUserVehicles);
router.get('/:username/:registrationNumber', userVehicleController.findUserAVehicle)
router.post('/:username', userVehicleController.insertUserVehicle);
router.patch('/:username/:registrationNumber', userVehicleController.updateUserVehicle);
router.delete('/:username/:registrationNumber', userVehicleController.deleteUserVehicle);

module.exports = router;