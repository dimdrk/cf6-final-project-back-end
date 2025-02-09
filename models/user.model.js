const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required field'],
        max: 100,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required field'],
        max: 100
    },
    role: {
        type: String,
        enum : ['OWNER', 'DRIVER', 'SUPER-ADMIN'],
        default: 'OWNER'
    },
    firstname: {
        type: String,
        max: 100,
    },
    lastname: {
        type: String,
        max: 100
    },
    email: {
        type: String,
        required: [true, 'Email is required field'],
        max: 100,
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email address is not valid",
        ],
    },
    phoneNumber: { type: String },
    city: { type: String }
},
{
    collection: 'users',
    timestamps: true
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema)