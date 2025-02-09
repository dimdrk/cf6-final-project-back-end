const ServiceRecord = require('../models/serviceRecord.model');
const logger = require('../logger/logger');

// find for a vehicle all service records
exports.findVehicleRecords = async(req, res) => {
    try {
        const registerNumber = req.params.registerNumber;
        const result = await ServiceRecord.find({ registerNumber: registerNumber});
        res.json({status: true, data: result});
    } catch (err) {
        res.json({status: false, data: err});
        logger.error("Error in finding service records.");
    }
}

// find for a vehicle a service record
exports.findAVehicleRecord = async(req, res) => {
    try {
        const id = req.params.id;
        const registerNumber = req.params.registerNumber;
        const result = await ServiceRecord.findOne({id: id, registerNumber: registerNumber});
        res.json({status: true, data: result});
    } catch (err) {
        res.json({status: false, data: err});
        logger.error("Error in finding service records.");
    }
}

// create for a vehicle a new service record
exports.insertVehicleRecord = async(req, res) => {
    try {
        const newServiceRecord = new ServiceRecord({
            id: req.params.id,
            registerNumber: req.params.registerNumber,
            serviceMileRange: req.body.serviceMileRange,
            description: req.body.description,
            dateOfService: req.body.dateOfService
        })
        const result = await newServiceRecord.save();
        res.status(200).json({data: result});
        logger.info("Service records inserted.", result);
    } catch (err) {
        res.status(400).json({data: err});
        logger.error("Error in inserting service records.", err);
    }
}

// update for a vehicle a service record
exports.updateVehicleRecord = async (req, res) => {
    const id = req.params.id;
    const registerNumber = req.params.registerNumber;
    const updateService = {
        serviceMileRange: req.body.serviceMileRange,
        description: req.body.description,
        dateOfService: req.body.dateOfService
    }
    console.log("Update vehicle properties for user", registerNumber);
    try {
        const result = await ServiceRecord.updateOne(
            { id: id, registerNumber: registerNumber },
            updateService,
            {new: true}
        )
        res.status(200).json({data: result});
        logger.info("Updated record service successfully");
    } catch (err) {
        res.status(400).json({data: err});
        logger.error("Error. Service record not updated.");
    }
}

// delete for a vehicle a service record
exports.deleteVehicleRecord = async(req, res) => {
    const id = req.params.id;
    const registerNumber = req.params.registerNumber;
    console.log("Delete service record");
    try {
        const result = await ServiceRecord.deleteOne({id: id, registerNumber: registerNumber})
        res.status(200).json({data: result});
    } catch (err) {
        res.status(400).json({data: err});
    }
}