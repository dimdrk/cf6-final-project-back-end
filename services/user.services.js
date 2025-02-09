const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');
const logger = require('../logger/logger');
const dotenv = require('dotenv');
const { error } = require('winston');

dotenv.config();


// for registration - create a user
exports.registerUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const city = req.body.city;

    const workFactor = 8;
    const hashedPassword = await bcrypt.hash(password, workFactor);
    const newUser = new User ({
    username: username,
    password: hashedPassword,
    role: role,
    firstname: firstname,
    lastname: lastname,
    email: email,
    phoneNumber: phoneNumber,
    city: city            
    });

    logger.info("Password encrypted successfully.");
    try {
        const result = await newUser.save();
        logger.info("Inserted user successfuly.");
        return res.status(200).json({ data: result});
    } catch (err) {
        logger.error("Error. User not inserted.");
        return res.status(400).json({ error });
    }
}


// login
exports.loginUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    try {
        const responseFind = await User.findOne({ username: username })
        if(responseFind.username === null){
            return { message: 'User not found.' };
        };
        const dbPassword = responseFind.password;    
        const passwordMatch = await bcrypt.compare(password, dbPassword);

        if (passwordMatch){        
            const payload = {
                "Username": responseFind.username,
                "Email": responseFind.email,
                "Role": responseFind.role
            };
            const secret = process.env.JWT_SECRET_KEY;
            const options = { expiresIn: '3h' };
            const response_token = jwt.sign(payload, secret, options)
            console.log(response_token)
            return res.status(200).json({                
                response_token: response_token,
                username: responseFind.username,
                email: responseFind.email,
                role: responseFind.role
            });
        };
        return { message: " password is wrong " };
    } catch {
        logger.error("Error. Something went wrong in logging in.")
    }
}