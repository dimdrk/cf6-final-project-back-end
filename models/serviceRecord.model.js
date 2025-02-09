const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let serviceRecordSchema = new Schema({
    id: { type: Number, unique: true, required: true },
    registerNumber: { type: String },
    serviceMileRange: { type: String },
    description: { type: String },
    dateOfService: { type: String}
},
{
    collection: 'serviceRecords',
    timestamps: true
});

module.exports = mongoose.model('ServiceRecord', serviceRecordSchema)