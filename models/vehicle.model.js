const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


let vehicleSchema = new Schema({
    username: { type: String, required: true },
    registrationNumber: { 
        type: String,
        unique: true, 
        required: true 
    },
    vehicleType: { 
        type: String,
        enum: [ 'CAR', 'MOTORCYCLE', 'TRUCK', 'BUS', 'BOAT'],
        default: 'CAR', 
        required: true 
     },
    mileRange: { type: String, required: true },
    manufacture: { type: String },
    model: { type: String },
    color: { type: String },
    registrationDate: { type: String }
},
{
    collection: 'vehicles',
    timestamps: true
});

vehicleSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Vehicle', vehicleSchema)