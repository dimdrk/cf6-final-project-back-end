const Vehicle = require('../models/vehicle.model');
const logger = require('../logger/logger');
const jwtToken = require('../authentication/token.auth');

// find for a user all vehicles
exports.findUserVehicles = async(req, res) => {
    try {
        const username = req.params.username;
        const result = await Vehicle.find({ username: username });
        res.status(200).json({data: result});
    } catch (err) {
        res.status(400).json({err});
        logger.error("Error in finding vehicles.");
    }
}

// find for a user a vehicle
exports.findUserAVehicle = async(req, res) => {
    try {
        const username = req.params.username;
        const registrationNumber = req.params.registrationNumber;
        const result = await Vehicle.findOne({ username: username, registrationNumber: registrationNumber });
        console.log(result)
        res.status(200).json({data: result});
    } catch (err) {
        res.status(400).json({err});
        logger.error("Error in finding vehicle.");
    }
}

// insert for a user a new vehicle
exports.insertUserVehicle = async(req, res) => {
    try {
        const newVehicle = new Vehicle ({
            username: req.params.username,
            registrationNumber: req.body.registrationNumber,
            vehicleType: req.body.vehicleType,
            mileRange: req.body.mileRange,
            manufacture: req.body.manufacture,
            model: req.body.model,
            color: req.body.color,
            registrationDate: req.body.registrationDate
        })
        const result = await newVehicle.save();
        res.status(200).json({data: result});
        logger.info("Vehicle inserted.", result);
    } catch (err) {
        res.status(400).json({data: err});
        logger.error("Error in inserting vehicle.", err);
    }
}

// update for a user a vehicle
exports.updateUserVehicle = async (req, res) => {
    const username = req.params.username;
    console.log(username)
    const registrationNumber = req.params.registrationNumber;
    const updateVehicle = {
        username: username,
        registrationNumber: registrationNumber,
        vehicleType: req.body.vehicleType,
        mileRange: req.body.mileRange,
        manufacture: req.body.manufacture,
        model: req.body.model,
        color: req.body.color,
        registrationDate: req.body.registrationDate
    }
    console.log("Update vehicle properties", updateVehicle);
    try {
        const result = await Vehicle.updateOne(
            { username: username, registrationNumber: registrationNumber },
            updateVehicle,
            { new: true }
        )
        res.status(200).json({data: result});
        logger.info("Updated vehicle successfully");
    } catch (err) {
        res.status(400).json({ data: err});
        logger.error("Error. Vehicle not updated.");
    }
}

// delete for a user a vehicle
exports.deleteUserVehicle = async(req, res) => {
    const username = req.params.username;
    const registrationNumber = req.params.registrationNumber
    console.log(registrationNumber)
    console.log("Delete vehicle from user", username);
    try {
        const result = await Vehicle.deleteOne({ username: username, registrationNumber: registrationNumber})
        res.json({status: true, data: result})
    } catch (err) {
        res.json({ status: true, data: err })
    }
}