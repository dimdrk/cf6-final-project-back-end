const express = require('express');
const router = express.Router();

const VehicleRecordController = require('../controllers/vehicle.record.controller');

router.get('/:registerNumber', VehicleRecordController.findVehicleRecords);
router.get('/:registerNumber/:id', VehicleRecordController.findAVehicleRecord)
router.post('/:registerNumber/:id', VehicleRecordController.insertVehicleRecord);
router.patch('/:registerNumber/:id', VehicleRecordController.updateVehicleRecord);
router.delete('/:registerNumber/:id', VehicleRecordController.deleteVehicleRecord);

module.exports = router;