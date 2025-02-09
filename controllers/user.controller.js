const User = require('../models/user.model');
const jwtToken = require('../authentication/token.auth');
const logger = require('../logger/logger');

// find all users
exports.findAll = async(req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Token is missing' });
    }
    
    try {
        const response = jwtToken.verifyAccessToken(token);
        if (!response.success){
            return res.status(403).json({ error: 'Token is wrong' });
        }
    } catch {
        logger.error("Error. Authorization unsuccessful.");
    }
    
    try {
        const result = await User.find();
        res.status(200).json({ data: result })
        logger.info('Success in reading all users.');
    } catch(err){
        res.status(409).json({ data: err })
        logger.error("Error in reading all users.");
    }
}

// find a user
exports.findUser = async(req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Token is missing' });
    }
    
    try {
        const response = jwtToken.verifyAccessToken(token);
        if (!response.success){
            return res.status(403).json({ error: 'Token is wrong' });
        }
    } catch {
        logger.error("Error. Authorization unsuccessful.");
    }
    const username = req.params.username;

    try {
        const result = await User.findOne({username: username});
        res.status(200).json({data: result});
        logger.info("Found user.");
    } catch(err) {
        res.status(400).json({data: err});
        logger.error("No users found.");
    }
}

// update a user
exports.update = async(req, res) => {
    const username = req.params.username;    
    const updateUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        city: req.body.city
    };
    try {
        const result = await User.findOneAndUpdate(
            {username: username},
            updateUser, 
            { new: true }
        )
        res.status(200).json({ data: result });
        logger.info("Updated user with username {}", result.username);
    } catch (err) {
        res.status(400).json({ data: err })
        logger.error("Error. User not updated.");
    }
}

// delete a user
exports.delete = async(req, res) =>{
    const username = req.params.username;
    try {
        const result = await User.findOneAndDelete({username: username})
        res.status(200).json({ data: result});
        logger.info("Deleted user with username {}", username);
    } catch (err) {
        res.status(400).json({ data: result});
        logger.error("Error. Usen not deleted.");
    }
}

