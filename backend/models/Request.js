// models/Request.js
const mongoose = require('mongoose');

const requestSchema = mongoose.Schema(
    {
        location: {
            latitude: {
                type: Number,
                required: true,
            },
            longitude: {
                type: Number,
                required: true,
            },
        },
        status: {
            type: String,
            required: true,
            enum: ['in process', 'resolved'],
            default: 'in process',
        },
        requestedTime: {
            type: Date,
            default: Date.now,
        },
        resolvedTime: {
            type: Date,
        },
        userEmail: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
